import { createTheme, ThemeProvider } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    background: {
      default: "#2b3137",
    },
    primary: {
      main: "#24292e",
      contrastText: "#fff",
    },
    secondary: {
      main: "#1e2124",
      contrastText: "#2dba4e",
    },
  },
});