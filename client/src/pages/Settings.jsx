import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  Slider,
  Checkbox,
  FormGroup,
  FormControlLabel,
  RadioGroup,
  Radio,
  Divider,
  Box,
} from "@mui/material";

import { Keyboard } from "@capacitor/keyboard"; 

import { theme } from "../theme";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(false);
  const [volume, setVolume] = useState(50);
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(false);
  const [themeChoice, setThemeChoice] = useState("system");

  useEffect(() => {
    (async function () {
      await Keyboard.hide();
    })();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: theme.palette.secondary.main,
        color: theme.palette.primary.contrastText,
        py: 2,
      }}
    >
      <Container maxWidth="sm" disableGutters>
        <Typography
          variant="h6"
          sx={{
            px: 2,
            py: 1,
            fontWeight: "bold",
            color: theme.palette.primary.contrastText,
          }}
        >
          General
        </Typography>
        <List disablePadding>
          <ListItem>
            <ListItemText
              primary="Dark Mode"
              secondary="Enable dark theme"
              sx={{ color: theme.palette.primary.contrastText }}
              slotProps={{
                secondary: {
                  style: { color: theme.palette.primary.contrastText },
                },
              }}
            />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                checked={darkMode}
                onChange={(e) => setDarkMode(e.target.checked)}
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: theme.palette.secondary.contrastText,
                    "&:hover": {
                      backgroundColor: "rgba(46, 125, 50, 0.08)",
                    },
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "#2e7d32",
                  },
                }}
              />
            </ListItemSecondaryAction>
          </ListItem>

          <Divider
            sx={{ backgroundColor: theme.palette.primary.contrastText }}
          />

          <ListItem>
            <ListItemText
              primary="Notifications"
              secondary="Receive app notifications"
              sx={{ color: theme.palette.primary.contrastText }}
              slotProps={{
                secondary: {
                  style: { color: theme.palette.primary.contrastText },
                },
              }}
            />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: theme.palette.secondary.contrastText,
                    "&:hover": {
                      backgroundColor: "rgba(46, 125, 50, 0.08)",
                    },
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "#2e7d32",
                  },
                }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>

        <Divider
          sx={{ my: 2, backgroundColor: theme.palette.primary.contrastText }}
        />
        <Typography
          variant="h6"
          sx={{
            px: 2,
            py: 1,
            fontWeight: "bold",
            color: theme.palette.primary.contrastText,
          }}
        >
          Sound
        </Typography>
        <List disablePadding>
          <ListItem>
            <ListItemText
              primary="Volume"
              secondary={`${volume}%`}
              sx={{ color: theme.palette.primary.contrastText }}
              slotProps={{
                secondary: {
                  style: { color: theme.palette.primary.contrastText },
                },
              }}
            />
          </ListItem>
          <Box sx={{ px: 3, pb: 2 }}>
            <Slider
              value={volume}
              onChange={(e, val) => setVolume(val)}
              step={1}
              min={0}
              max={100}
              valueLabelDisplay="auto"
              sx={{ color: theme.palette.secondary.contrastText }}
            />
          </Box>
        </List>

        <Divider
          sx={{ my: 2, backgroundColor: theme.palette.primary.contrastText }}
        />
        <Typography
          variant="h6"
          sx={{
            px: 2,
            py: 1,
            fontWeight: "bold",
            color: theme.palette.primary.contrastText,
          }}
        >
          Connectivity
        </Typography>
        <Box sx={{ px: 3, pb: 2 }}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={wifi}
                  onChange={(e) => setWifi(e.target.checked)}
                  sx={{
                    color: theme.palette.secondary.contrastText,
                    "&.Mui-checked": {
                      color: theme.palette.secondary.contrastText,
                    },
                  }}
                />
              }
              label="Wi-Fi"
              sx={{ color: theme.palette.primary.contrastText }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={bluetooth}
                  onChange={(e) => setBluetooth(e.target.checked)}
                  sx={{
                    color: theme.palette.secondary.contrastText,
                    "&.Mui-checked": {
                      color: theme.palette.secondary.contrastText,
                    },
                  }}
                />
              }
              label="Bluetooth"
              sx={{ color: theme.palette.primary.contrastText }}
            />
          </FormGroup>
        </Box>

        <Divider
          sx={{ my: 2, backgroundColor: theme.palette.primary.contrastText }}
        />
        <Typography
          variant="h6"
          sx={{
            px: 2,
            py: 1,
            fontWeight: "bold",
            color: theme.palette.primary.contrastText,
          }}
        >
          Theme Preference
        </Typography>
        <Box sx={{ px: 3, pb: 2 }}>
          <RadioGroup
            value={themeChoice}
            onChange={(e) => setThemeChoice(e.target.value)}
          >
            <FormControlLabel
              value="light"
              control={
                <Radio
                  sx={{
                    color: theme.palette.secondary.contrastText,
                    "&.Mui-checked": {
                      color: theme.palette.secondary.contrastText,
                    },
                  }}
                />
              }
              label="Light"
              sx={{ color: theme.palette.primary.contrastText }}
            />
            <FormControlLabel
              value="dark"
              control={
                <Radio
                  sx={{
                    color: theme.palette.secondary.contrastText,
                    "&.Mui-checked": {
                      color: theme.palette.secondary.contrastText,
                    },
                  }}
                />
              }
              label="Dark"
              sx={{ color: theme.palette.primary.contrastText }}
            />
            <FormControlLabel
              value="system"
              control={
                <Radio
                  sx={{
                    color: theme.palette.secondary.contrastText,
                    "&.Mui-checked": {
                      color: theme.palette.secondary.contrastText,
                    },
                  }}
                />
              }
              label="System Default"
              sx={{ color: theme.palette.primary.contrastText }}
            />
          </RadioGroup>
        </Box>
      </Container>
    </Box>
  );
}
