// src/pages/Home.jsx

import DynamicTouchpad from "../components/DynamicTouchpad";
import PicoW from "../components/PicoW";
import Macros from "../components/Macros";
import DynamicKeyboard from "../components/DynamicKeyboard";
import Box from "@mui/material/Box";
export default function Home({ 
  displayedTab,
  connectionStatus,
  setConnectionStatus
}) {
  const keyboardHeight = "350px"; 

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      
      <Box 
        sx={{ 
          flex: '1 1 auto',
          overflowY: 'auto',
          paddingBottom: keyboardHeight
        }}
      >
        {displayedTab === 0 ? <DynamicTouchpad /> : null}
        {displayedTab === 1 ? <PicoW connectionStatus={connectionStatus} setConnectionStatus={setConnectionStatus} /> : null}
        {displayedTab === 2 ? <Macros /> : null}
      </Box>

      <DynamicKeyboard />
    </Box>
  );
}