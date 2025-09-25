# Pikurusu controller
Send keyboard and mouse commands via a hybrid HID descriptor over BLE.

---

## Installation
1. Clone the repository: `$ git clone https://github.com/brylleee/pikurusu`
2. Install and download the Pimoroni Micropython build. (This build includes USB support out of the box). Drag and drop the .uf2 file to the RPI Pico W (Make sure it is in BOOTSEL mode). https://github.com/pimoroni/pimoroni-pico/releases.
3. Drag and drop the files here to the root folder of the Pimoroni Micropython-installed Rapberry Pi Pico W.

## Documentation
Upon boot, Pikurusu will advertise itself using BLE as `Pikurusu`, exposing a service named with Vendor UUID: `A115AAE1-C0DE-BABE-FEED-0DECAFC0FFEE`.\
Currently. each command sent to Pikurusu has to be **20 bytes maximum**, this is the default MTU and even so, commands are catered to fit perfectly within 20 bytes.

#### Characteristics:
Keyboard and mouse commands: `A115AAE1-4FF9-4411-A934-FBBE16F8D487`\
Controller-related commands: `A115AAE1-CDCA-452F-95B5-D53741FAAB0B`

#### Keyboard and mouse commands
Pikurusu uses a modified version of [Ducky Script 3.0](https://docs.hak5.org/hak5-usb-rubber-ducky/duckyscript-quick-reference/) from @dbisu.\
Original payloads written for USB Rubber Ducky should work with Pikurusu.

##### Here are the new features added:
1. `RANDOM_*` is now `RAND_*` to fit 20 bytes limitation
2. `MOUSE x y` - moves the mouse to x and y relative to the current mouse's position. (-127 to 128)
3. `MOUSE_LEFT` - left click with a 20ms delay before release
4. `MOUSE_RIGHT` - right click with a 20ms delay before release
5. `MOUSE_MIDDLE` - middle click with a 20ms delay before release
6. `MOUSE_LEFT_HOLD` - holds left click
7. `MOUSE_RIGHT_HOLD` - holds right click
8. `MOUSE_MIDDLE_HOLD` - holds middle click
9. `MOUSE_LEFT_RELEASE` - releases left click if held
10. `MOUSE_RIGHT_RELEASE` - releases right click if held
11. `MOUSE_MIDDLE_RELEASE` - releases middle click if held

#### Controller-related commands
Currently, controller related commands are not yet implemented. 

##### Planned features:
1. Set payload to run automatically once plugged into USB port
2. Set timer before shutting down
3. Enable/Disable onboard LED indicator