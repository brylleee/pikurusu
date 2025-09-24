import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import Typography from "@mui/material/Typography";

import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoIcon from "@mui/icons-material/Info";

import { Link } from "react-router-dom";

import { theme } from "../theme";

export default function DrawerContent({ setDrawerOpen, open }) {
  const DrawerList = (
    <Box
      sx={{
        width: 250,
        backgroundColor: theme.palette.secondary.main,
        height: "100%",
        color: theme.palette.primary.contrastText,
      }}
      role="presentation"
    >
      <Typography variant="h4" sx={{ m: 2 }}>
        Pikurusu
      </Typography>
      <Typography variant="body1" sx={{ mb: 1, mx: 2 }}>
        The bastard at the USB port.
      </Typography>
      <Typography variant="body2" sx={{ mb: 2, mx: 2 }}>
        Version 0.1.0 by kairo from A1SBERG
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/"
            onClick={() => setDrawerOpen(false)}
          >
            <ListItemIcon sx={{ color: theme.palette.primary.contrastText }}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            button
            component={Link}
            to="/settings"
            onClick={() => setDrawerOpen(false)}
          >
            <ListItemIcon sx={{ color: theme.palette.primary.contrastText }}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            button
            component={Link}
            to="/readme"
            onClick={() => setDrawerOpen(false)}
          >
            <ListItemIcon sx={{ color: theme.palette.primary.contrastText }}>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="Readme" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Drawer open={open} onClose={() => setDrawerOpen(false)}>
      {DrawerList}
    </Drawer>
  );
}
