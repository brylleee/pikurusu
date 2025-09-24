import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

import { VolumeButtons } from "@capacitor-community/volume-buttons";

import { theme } from "../theme";
import { useEffect, useRef } from "react";

import { send_key } from "../pikurusu";

export default function DynamicTouchpad() {
  const divRef = useRef(null);
  const lastSendRef = useRef(0);

  const handleTouch = (e) => {
    const rect = divRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = Math.round(touch.clientX - rect.left);
    const y = Math.round(touch.clientY - rect.top);

    if (!(x >= 0 && x <= rect.width) || !(y >= 0 && y <= rect.height)) {
      return;
    }

    const now = performance.now();

    if (now - lastSendRef.current > 100) {
      let speed_x = Math.round((x - rect.width / 2) / 3);
      let speed_y = Math.round((y - rect.height / 2) / 3);

      console.log("MOUSE " + speed_x + " " + speed_y);
      send_key("MOUSE " + speed_x + " " + speed_y);

      lastSendRef.current = now;
    }
  };

  useEffect(() => {
    VolumeButtons.watchVolume({}, (result) => {
      if (result.direction === "up") {
        send_key("MOUSE_LEFT");
      } else if (result.direction === "down") {
        send_key("MOUSE_RIGHT");
      }
    });
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        left: 0,
        right: 0,
        width: "100vw",
        height: "300px",
        overflow: "hidden",
      }}
    >
      <Box sx={{ height: "100%" }}>
        <div
          id="touchpad"
          ref={divRef}
          onTouchMove={handleTouch}
          style={{ height: "100%" }}
        >
          <Card
            variant="outlined"
            sx={{
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.secondary.contrastText,
              height: "100%",
              borderRadius: 0,
            }}
          ></Card>
        </div>
      </Box>
    </Box>
  );
}
