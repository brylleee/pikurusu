# Pikurusu
Android controlled, PC/Android remote controller using Raspberry Pi Pico W 

---

## How it works
Pikurusu works like a hybrid mouse and keyboard device, receiving inputs from an external client device, usually an Android app, through Bluetooth Low Energy (BLE). The inputs come in the form of an improved and extended Ducky Script, which will be referred to as Ducky Script Extended, from @dbisu's pico-ducky. (see below for changes and additions). This Ducky Script Extended allows users to create macros for automation or attack payloads that can run once a device connects or at the user's will. Inputs can be sent in real time, as opposed to macros, which the Pikurusu controller executes instantly.

---
## Limitations
1. The BLE GATT specification allows a default of 20 bytes of writing to a characteristic. Pikurusu handles this by sending each command, real time or through a macro, individually. When using the STRING Ducky Script command, Pikurusu client will truncate characters longer than the limit, and append it to a new STRING command after it. Other commands are adjusted to ensure they fit the limit. **Ducky Script Extended is strictly 1 command per line**.
2. No feedback or output. Pikurusu acts as a USB Human Interface Device. It is similar to how your keyboard or mouse doesn't know where your inputs appear. For red teaming purposes, you can run a malware which records the screen by automating its execution via Pikurusu.
3. Mouse movement is jitterish. It could be improved in the future, but due to the speed limitations of BLE, there is a 100ms delay between sending relative mouse movements to avoid command "backlogs".
4. Only supports Raspberry Pi Pico W microcontroller. RPi Pico W is USB HID and wireless capable. You can use other microcontrollers that supports these functionalities as well, but I cannot guarantee it works.

---

## In progress features
- Macro tab
- Sending commands and configs for the Pikurusu Controller
- Sending middle click and scroll reports
- Settings (currently everything in there is a placeholder)

## Currently working features
- Everything in `microcontroller/` should work fine
- Touchpad, keyboard, left and right click
- LED Indicator

---

## Installation
To use Pikurusu...
1. Install and download the Pimoroni Micropython build. (This build includes USB support out of the box). Drag and drop the .uf2 file to the RPI Pico W. https://github.com/pimoroni/pimoroni-pico/releases
2. Drag and drop the files from microcontroller/ folder to the root folder of the Pimoroni Micropython-installed Rapberry Pi Pico W.
3. Install the Pikurusu client on your android device. (IOS / Desktop builds will come soon).

---
## How to use
Pikurusu controller advertises a single service with a vendor UUID with bytes: `a115aae1-c0de-babe-feed-0decafc0ffee`. The Pikurusu client will pick and show Bluetooth peripherals that match.
1. Simply tap the Pikurusu controller and an LED indicator to the top right of your client will light up.
2. Use the keyboard, extended buttons, and the trackpad to send inputs to the Pikurusu controller, this will be sent as real time inputs. The volume up and down on android is left and right click respectively.
3. Hover over the Pikurusu tab to show Pikurusu controller's current status.
4. Hover over the Macro tab to edit, run, or delete prebuilt Macros, or add your own by writing a Ducky Script Extended .dd2 file.

**For Pikurusu client**:
The LED indicator on the top right shows:
*Gray* - if idle
*Blue* - if connecting
*Green* - if currently connected
*Red* - if disconnected

---

## Notes
Ducky Script Extended features as contrast to Ducky
1. `RANDOM_*` is now `RAND_*` to fit 20 bytes limitation
2. `MOUSE x y`, `MOUSE_LEFT`, `MOUSE_RIGHT`, `MOUSE_MIDDLE`, `MOUSE_LEFT_HOLD`, `MOUSE_RIGHT_HOLD`, `MOUSE_MIDDLE_HOLD`, `MOUSE_LEFT_RELEASE`, `MOUSE_RIGHT_RELEASE`, `MOUSE_MIDDLE_RELEASE` are new added functionalities for the mouse.