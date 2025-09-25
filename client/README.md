# Pikurusu client
Capacitor.js with React.js and Material UI client app for Pikurusu.

---

## Installation
1. Clone the repository: `$ git clone https://github.com/brylleee/pikurusu`
2. Go into the `client/` directory and install necessary packages using `npm install`
3. Run the following commands:

```
npm build
# Refer to https://capacitorjs.com/docs/getting-started
# if you want to target other platforms such as iOS
npm install @capacitor/android
npx cap add android

npx cap sync

# Android device must enable USB or Wireless Debugging
# and connected via adb using
# adb connect <IP of Android>:<Port> 
npx cap run android
```

...or check [Releases](https://github.com/brylleee/pikurusu/releases/tag/beta) page for binaries. (IOS / Desktop builds will come soon).\

Because of the nature of this client, you are naturally able to statically build and run this in a bluetooth capable browser. See [Web Bluetooth](https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API)

## Documentation
Below is the Pikurusu client's pages and features\
- `Home` - contains the interface you'll need to interact with the Pikurusu controller\
    - `Controller` - contains the trackpad and keyboard that will be translated into Keyboard and Mouse HID reports\
    - `Pikurusu` - scans for Pikurusu controllers if not connected, otherwise displays information about the Pikurusu controller\
    - `Macro` - contains preloaded Ducky Script payloads, you can also write your own payloads here, or import a file.\
- `Settings` - contains configurations on how the client will interact with the Pikurusu controller\
- `Readme` - usage guide for the client\

`Top bar` - on the top right is a small LED indicator that lights up depending on the connection with Pikurusu controller\
**Red** - disconnected\
**Blue** - connecting\
**Green** - connected\
**Gray** - idle\