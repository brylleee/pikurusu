import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import BluetoothIcon from "@mui/icons-material/Bluetooth";

import { theme } from "../theme";
import { useEffect, useState } from "react";
import { search_pikurusu, connect_pikurusu, disconnect_pikurusu } from "../pikurusu";

export default function PicoW({ connectionStatus, setConnectionStatus }) {
  const [devices, setDevices] = useState([]);
  const [chosenDevice, setChosenDevice] = useState(null);
  const [scanning, setScanning] = useState(false);

  // Explicit scan function
  const scanDevices = async () => {
    setScanning(true);
    try {
      const foundDevices = await search_pikurusu();
      setDevices(foundDevices || []);
    } catch (err) {
      console.error("Failed to scan devices:", err);
      setDevices([]);
    } finally {
      setScanning(false);
    }
  };

  useEffect(() => {
    const storedDevice = localStorage.getItem("chosenDevice");
    const storedStatus = localStorage.getItem("connectionStatus");

    if (storedDevice && storedStatus) {
      setChosenDevice(JSON.parse(storedDevice));
      setConnectionStatus(storedStatus);
    }

    scanDevices();
  }, [setConnectionStatus]);

  const handleConnect = async (device) => {
    setConnectionStatus("connecting");

    try {
      const success = await connect_pikurusu(device.deviceId);
      if (success) {
        setChosenDevice(device);
        setConnectionStatus("connected");

        localStorage.setItem("chosenDevice", JSON.stringify(device));
        localStorage.setItem("connectionStatus", "connected");
      } else {
        setConnectionStatus("disconnected");
        localStorage.setItem("connectionStatus", "disconnected");
      }
    } catch (err) {
      console.error("Failed to connect:", err);
      setConnectionStatus("disconnected");
      localStorage.setItem("connectionStatus", "disconnected");
    }
  };

  const handleDisconnect = async () => {
    if (!chosenDevice) return;

    try {
      await disconnect_pikurusu(chosenDevice.deviceId);
    } catch (err) {
      console.error("Failed to disconnect:", err);
    }

    setChosenDevice(null);
    setConnectionStatus("idle");

    localStorage.removeItem("chosenDevice");
    localStorage.setItem("connectionStatus", "idle");

    scanDevices();
  };

  const renderConnected = () => (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        Connected to {chosenDevice?.name || "Unknown Device"}
      </Typography>
      <Typography variant="body1" sx={{ color: "#fff", mb: 2 }}>
        Device ID: {chosenDevice?.deviceId || "No ID"}
      </Typography>
      <Button variant="contained" color="secondary" onClick={handleDisconnect}>
        Disconnect
      </Button>
    </Box>
  );

  const renderDeviceList = () => (
    <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
      {devices.length === 0 && !scanning ? (
        <Typography variant="h5">No Pikurusu devices found.</Typography>
      ) : scanning ? (
        <Typography variant="h5">Scanning for devices...</Typography>
      ) : (
        <>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            Found devices:
          </Typography>
          <List>
            {devices.map((device, index) => (
              <div key={index}>
                <ListItem
                  button
                  onClick={() => handleConnect(device)}
                  disabled={connectionStatus === "connecting"}
                  sx={{
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                    cursor: connectionStatus === "connecting" ? "not-allowed" : "pointer",
                  }}
                >
                  <ListItemIcon>
                    <BluetoothIcon sx={{ color: "#fff" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography variant="h6">{device.name || "Unknown Device"}</Typography>}
                    secondary={<Typography sx={{ color: "#fff" }}>{device.deviceId || "No ID"}</Typography>}
                  />
                </ListItem>
                {index < devices.length - 1 && <Divider sx={{ borderColor: "#fff" }} />}
              </div>
            ))}
          </List>
        </>
      )}
    </Box>
  );

  return (
    <Box sx={{ position: "relative", left: 0, right: 0, width: "100vw", height: "300px", overflow: "hidden" }}>
      <Card
        variant="outlined"
        sx={{ backgroundColor: theme.palette.secondary.main, color: theme.palette.secondary.contrastText, height: "100%", borderRadius: 0 }}
      >
        <CardContent sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          {connectionStatus === "connected" ? renderConnected() : renderDeviceList()}
        </CardContent>
      </Card>
    </Box>
  );
}
