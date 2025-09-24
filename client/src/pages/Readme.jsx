import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Card,
  CardContent,
  Paper,
  Stack,
  Divider,
} from "@mui/material";
import { GitHub, Language, Facebook } from "@mui/icons-material";

import { theme } from "../theme";

export default function Readme() {
  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Typography
        variant="h3"
        align="center"
        sx={{ fontWeight: "bold", color: theme.palette.secondary.contrastText }}
      >
        About Pikurusu
      </Typography>
      <Typography
        sx={{ fontWeight: "bold", color: theme.palette.primary.contrastText }}
        variant="body2"
        align="center"
        gutterBottom
      >
        An HID injector using Raspberry Pi Pico W's BLE
      </Typography>

      <Divider
        sx={{ my: 3, backgroundColor: theme.palette.primary.contrastText }}
      />

      <Card
        elevation={2}
        sx={{
          mb: 4,
          borderRadius: 1,
          bgcolor: theme.palette.secondary.main,
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: "medium",
              color: theme.palette.primary.contrastText,
            }}
          >
            Overview
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: theme.palette.primary.contrastText }}
          >
            Pikurusu works like a hybrid mouse and keyboard device, receiving inputs from an external client device, usually an Android app, through Bluetooth Low Energy (BLE).
            The inputs come in the form of an improved and extended Ducky Script, which will be referred to as Ducky Script Extended, from @dbisu's pico-ducky.
            (see below for changes and additions).
            <br/><br/>
            This Ducky Script Extended allows users to create macros for automation or attack payloads that can run once a device connects or at the user's will.
            Inputs can be sent in real time, as opposed to macros, which the Pikurusu controller executes instantly.
          </Typography>
        </CardContent>
      </Card>

      <Card
        elevation={2}
        sx={{
          mb: 4,
          borderRadius: 1,
          bgcolor: theme.palette.secondary.main,
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ color: theme.palette.primary.contrastText }}
          >
            FAQs
          </Typography>
          <List>
            <ListItem divider>
              <ListItemText
                primary="Q: How to use this app?"
                secondary="A: Make sure to read the readme.md. You must pair your Pico W flashed with Pimoroni Micropython with this app first."
                sx={{ color: theme.palette.secondary.contrastText }}
                slotProps={{
                  secondary: {
                    style: { color: theme.palette.primary.contrastText },
                  },
                }}
              />
            </ListItem>
            <ListItem divider>
              <ListItemText
                primary="Q: What can it do?"
                secondary="A: Connect it via USB to a computer or phone, you are able to send HID commands via Bluetooth or use and customize your own payloads."
                sx={{ color: theme.palette.secondary.contrastText }}
                slotProps={{
                  secondary: {
                    style: { color: theme.palette.primary.contrastText },
                  },
                }}
              />
            </ListItem>
            <ListItem divider>
              <ListItemText
                primary="Q: How do I know if my Pico W is connected?"
                secondary="A: At the top right is a light indicator. If it's green, you are connected. If it's gray or red then you are not connected."
                sx={{ color: theme.palette.secondary.contrastText }}
                slotProps={{
                  secondary: {
                    style: { color: theme.palette.primary.contrastText },
                  },
                }}
              />
            </ListItem>
            <ListItem divider>
              <ListItemText
                primary="Q: Wheres the trackpad?"
                secondary="A: Above the keyboard. It's a dark patch of square in your screen, just below the app bar."
                sx={{ color: theme.palette.secondary.contrastText }}
                slotProps={{
                  secondary: {
                    style: { color: theme.palette.primary.contrastText },
                  },
                }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Q: Does it work with other BLE-capable microcontrollers?"
                secondary="A: Not as of this moment. Only Raspberry Pi Pico W is supported. You can try though, but no guarantees."
                sx={{ color: theme.palette.secondary.contrastText }}
                slotProps={{
                  secondary: {
                    style: { color: theme.palette.primary.contrastText },
                  },
                }}
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>

      {/* Footer */}
      <Paper
        elevation={1}
        sx={{
          mt: 2,
          py: 3,
          borderRadius: 1,
          bgcolor: theme.palette.secondary.main,
          textAlign: "center",
        }}
      >
        <Typography
          variant="body1"
          gutterBottom
          sx={{ fontWeight: 500, color: theme.palette.primary.contrastText }}
        >
          Made with ❤️ by kairo from A1SBERG
        </Typography>
        <Stack direction="row" spacing={3} justifyContent="center">
          <IconButton
            component="a"
            href="https://github.com/brylleee"
            target="_blank"
            rel="noopener"
            aria-label="GitHub"
            sx={{ color: theme.palette.primary.contrastText }}
          >
            <GitHub fontSize="large" />
          </IconButton>
          <IconButton
            component="a"
            href="https://akosibrylle.dev"
            target="_blank"
            rel="noopener"
            aria-label="Website"
            sx={{ color: theme.palette.primary.contrastText }}
          >
            <Language fontSize="large" />
          </IconButton>
          <IconButton
            component="a"
            href="https://facebook.com/brylle.olaivar.2025"
            target="_blank"
            rel="noopener"
            aria-label="Facebook"
            sx={{ color: theme.palette.primary.contrastText }}
          >
            <Facebook fontSize="large" />
          </IconButton>
        </Stack>
      </Paper>
    </Container>
  );
}
