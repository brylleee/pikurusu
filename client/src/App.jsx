import "./App.css";

import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import { theme } from "./theme";

import AppBarContent from "./components/AppBarContent";
import DrawerContent from "./components/DrawerContent";

import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Readme from "./pages/Readme";

export default function Application() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [displayedTab, setDisplayedTab] = useState(0);

  const [connectionStatus, setConnectionStatus] = useState("idle");

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <AppBarContent
          setDrawerOpen={setDrawerOpen}
          displayedTab={displayedTab}
          setDisplayedTab={setDisplayedTab}
          connectionStatus={connectionStatus}
          setConnectionStatus={setConnectionStatus}
        />

        <DrawerContent open={drawerOpen} setDrawerOpen={setDrawerOpen} />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                displayedTab={displayedTab}
                connectionStatus={connectionStatus}
                setConnectionStatus={setConnectionStatus}
              />
            }
          />
          <Route path="/settings" element={<Settings />} />
          <Route path="/readme" element={<Readme />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}
