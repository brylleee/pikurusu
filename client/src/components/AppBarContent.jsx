import { useLocation } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Status from "./Status";

import { theme } from "../theme";

export default function AppBarContent({
  setDrawerOpen,
  setDisplayedTab,
  displayedTab,
  connectionStatus
}) {
  const location = useLocation();

  return (
    <AppBar
      position="sticky"
      color="primary"
      elevation={6}
      sx={{
        width: "100vw",
        left: 0,
        right: 0,
        top: 0,
        boxSizing: "border-box",
        m: 0,
        p: 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100vw",
          p: 0,
          m: 0,
        }}
      >
        <Toolbar 
          sx={{
            pt: { xs: 1, sm: 2 },
            width: "100vw",
            minHeight: { xs: 56, sm: 64 },
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, pt: { xs: 1, sm: 2 } }}
          >
            {/* Show current page name */}
            {
              location.pathname === "/" ? "Pikurusu" :
              location.pathname.charAt(1).toUpperCase() + String(location.pathname).slice(2) 
            }
          </Typography>

          <Status status={connectionStatus} />
        </Toolbar>

        {location.pathname === "/" ? (
          <Tabs
            value={displayedTab}
            variant="fullWidth"
            textColor="inherit"
            indicatorColor="secondary"
            TabIndicatorProps={{ style: { background: theme.palette.secondary.contrastText } }}
            onChange={(_, val) => setDisplayedTab(val)}
            sx={{
              mt: "auto",
              minHeight: { xs: 48, sm: 56 },
              width: "100vw",
            }}
          >
            <Tab label="Controller" value={0} />
            <Tab label="Pico W" value={1} />
            <Tab label="Macros" value={2} />
          </Tabs>
        ) : null}
      </Box>
    </AppBar>
  );
}
