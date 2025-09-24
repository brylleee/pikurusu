import Box from "@mui/material/Box";

const statusColors = {
  idle: "#444",
  connecting: "#2196f3",
  connected: "#4caf50",
  disconnected: "#f44336",
};

export default function Status({ status }) {
  const color = statusColors[status] || statusColors.idle;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: 3,
          height: 3,
          borderRadius: "50%",
          background: color,
          boxShadow: `0 0 12px 2px ${color}`,
          animation: "pulse 1.2s infinite",
        }}
      />
      <style>
        {`
          @keyframes pulse {
            0% {
              box-shadow: 0 0 0 0 ${color}88, 0 0 12px 2px ${color};
            }
            70% {
              box-shadow: 0 0 0 8px ${color}00, 0 0 12px 2px ${color};
            }
            100% {
              box-shadow: 0 0 0 0 ${color}88, 0 0 12px 2px ${color};
            }
          }
        `}
      </style>
    </Box>
  );
}