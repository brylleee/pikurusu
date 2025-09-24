import { BleClient } from '@capacitor-community/bluetooth-le';

const PIKURUSU_SERVICE = 'a115aae1-c0de-babe-feed-0decafc0ffee';
const CONTROL_CHAR = 'A115AAE1-4FF9-4411-A934-FBBE16F8D487';
const CMD_CHAR = 'A115AAE1-CDCA-452F-95B5-D53741FAAB0B';

let DEVICE_ID = '';

export async function search_pikurusu(scanTimeMs = 5000) {
  await BleClient.initialize();

  const devicesFound = {};

  return new Promise((resolve, reject) => {
    BleClient.requestLEScan(
      { services: [PIKURUSU_SERVICE], allowDuplicates: false },
      (result) => {
        const id = result.device?.identifier || result.device?.name;
        if (id && !devicesFound[id]) {
          devicesFound[id] = result.device;
        }
      }
    )
      .then(() => {
        setTimeout(() => {
          BleClient.stopLEScan()
            .then(() => resolve(Object.values(devicesFound)))
            .catch(reject);
        }, scanTimeMs);
      })
      .catch(reject);
  });
}

export async function connect_pikurusu(deviceId) {
    await BleClient.connect(deviceId, () => { return false });
    DEVICE_ID = deviceId;
    return true;
}

export async function disconnect_pikurusu() {
    DEVICE_ID = '';
}

export async function send_key(key) {
    const encoder = new TextEncoder();
    const data = new DataView(encoder.encode(key).buffer);
    await BleClient.write(DEVICE_ID, PIKURUSU_SERVICE, CONTROL_CHAR, data);
    console.log(key);
}

export async function send_cmd() {

}