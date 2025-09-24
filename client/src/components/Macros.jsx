import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { theme } from "../theme";

export default function Macros() {
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
        <Card
          variant="outlined"
          sx={{
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText,
            height: "100%",
            borderRadius: 0,
          }}
        >
          <CardContent>
            <Typography variant="h5" component="div">
              Macros here
            </Typography>
            <Typography sx={{ mb: 1.5 }}>The bastard in your USB port</Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}