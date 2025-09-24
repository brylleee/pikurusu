import React, { useState, useRef } from "react";
import { createPortal } from "react-dom";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { send_key } from '../pikurusu'

export default function DynamicKeyboard() {
  const [layoutName, setLayoutName] = useState("default");
  const [shiftLocked, setShiftLocked] = useState(false);
  const lastShiftTap = useRef(0);

  const onKeyPress = (button) => {
    if (button === "{shift}") {
      const now = Date.now();
      if (now - lastShiftTap.current < 400) {
        setShiftLocked((prev) => !prev);
        setLayoutName(!shiftLocked ? "shift" : "default");
      } else {
        if (!shiftLocked) setLayoutName("shift");
      }
      lastShiftTap.current = now;
      return;
    }

    if (button === "{symbols}") {
      setLayoutName((prev) => (prev === "symbols" ? "default" : "symbols"));
      return;
    }

    if (button === "{backspace}") {
      send_key("BACKSPACE");
    } else if (button === "{enter}") {
      send_key("ENTER");
    } else if (button === "{space}") {
      send_key("SPACE");
    } else {
      send_key("STRING " + button);
    }

    if (!shiftLocked && layoutName === "shift") {
      setLayoutName("default");
    }
  };

  const layouts = {
    default: [
      "1 2 3 4 5 6 7 8 9 0",
      "q w e r t y u i o p",
      "a s d f g h j k l",
      "{shift} z x c v b n m {backspace}",
      "{symbols} {space} {enter}",
    ],
    shift: [
      "1 2 3 4 5 6 7 8 9 0",
      "Q W E R T Y U I O P",
      "A S D F G H J K L",
      "{shift} Z X C V B N M {backspace}",
      "{symbols} {space} {enter}",
    ],
    symbols: [
      "1 2 3 4 5 6 7 8 9 0",
      "~ ` | < > { } [ ] \\",
      "@ # $ _ & - + ( ) /",
      ". , * \" ' : ; ! ? {backspace}",
      "{symbols} {space} {enter}",
    ],
  };

  const topRowKeys = [
    "ESCAPE", "CAPSLOCK", "PAGEUP", "PAGEDOWN",
    "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12",
  ];

  const bottomRowKeys = ["TAB", "SHIFT", "CTRL", "ALT", "GUI", "UP", "DOWN", "LEFT", "RIGHT"];

  const onSpecialKeyPress = (button) => {
    send_key(button);
  };

  return createPortal(
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <Box sx={{ display: "flex", overflowX: "auto", width: "100%" }}>
          {topRowKeys.map((key) => (
            <Button
              key={key}
              variant="contained"
              sx={{
                minWidth: 56,
                borderRadius: 0,
                flex: "0 0 auto",
                backgroundColor: "#121212",
              }}
              onClick={() => onSpecialKeyPress(key)}
            >
              {key}
            </Button>
          ))}
        </Box>
        <Box sx={{ display: "flex", overflowX: "auto", width: "100%" }}>
          {bottomRowKeys.map((key) => (
            <Button
              key={key}
              variant="contained"
              sx={{
                minWidth: 56,
                borderRadius: 0,
                flex: "0 0 auto",
                backgroundColor: "#121212",
              }}
              onClick={() => onSpecialKeyPress(key)}
            >
              {key}
            </Button>
          ))}
        </Box>
      </Box>

      <Box sx={{ flex: "0 0 auto" }}>
        <Keyboard
          layout={layouts}
          layoutName={layoutName}
          onKeyPress={onKeyPress}
          theme={"hg-theme-default darkKeyboard"}
          display={{
            "{backspace}": "⌫",
            "{enter}": "⏎",
            "{shift}": "⇧",
            "{symbols}": "123",
            "{abc}": "ABC",
            "{space}": "␣",
          }}
        />
      </Box>

      <Box sx={{ height: "45px", background: "#121212" }} />

      <style>{`
        .darkKeyboard.simple-keyboard {
          width: 100%;
          background: #121212;
        }
        .darkKeyboard .hg-rows {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }
        .darkKeyboard .hg-button {
          background: #1e1e1e;
          color: #f5f5f5;
          border-radius: 6px;
          font-size: 1.2rem;
          padding: 18px 12px;
          margin: 2px;
        }
        .darkKeyboard .hg-button:active {
          background: #333;
        }
      `}</style>
    </Box>,
    document.body
  );
}
