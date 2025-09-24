# License : GPLv2.0
# copyright (c) 2025 Brylle Olaivar
# Author: Brylle Olaivar @brylleee (akosibrylle.dev)

import bluetooth
import asyncio
import aioble
import machine

from dd_parser import runScript, init
import usb.device
from hybrid_input import HybridInterface

ble = bluetooth.BLE()
ble.active(True)

_BLE_SERVICE_UUID = bluetooth.UUID("A115AAE1-C0DE-BABE-FEED-0DECAFC0FFEE")
_BLE_CONTROL_CHAR_UUID = bluetooth.UUID("A115AAE1-4FF9-4411-A934-FBBE16F8D487")
_BLE_CMD_CHAR_UUID = bluetooth.UUID("A115AAE1-CDCA-452F-95B5-D53741FAAB0B")

_ADV_INTERVAL_MS = 200_000

pikurusu_service = aioble.Service(_BLE_SERVICE_UUID)
control_characteristic = aioble.Characteristic(pikurusu_service, _BLE_CONTROL_CHAR_UUID, write=True, write_no_response=True)
cmd_characteristic = aioble.Characteristic(pikurusu_service, _BLE_CMD_CHAR_UUID, read=True, write=True, notify=True)
aioble.register_services(pikurusu_service)

controller = HybridInterface()
usb.device.get().init(controller, builtin_driver=True)

while not controller.is_open():
    machine.idle()

init(controller)  # pass controller object to dd_parser

async def peripheral_advertise():
    while True:
        try:
            async with await aioble.advertise(
                _ADV_INTERVAL_MS,
                name="Pikurusu",
                services=[_BLE_SERVICE_UUID],
            ) as connection:
                await connection.disconnected()
        except Exception as e:
            print(e)
        finally:
            await asyncio.sleep_ms(100)
            
async def control_handler():
    while True:
        conn = await control_characteristic.written()
        if controller.is_open():
            runScript(control_characteristic.read().decode().split("\n"))
        
async def cmd_handler():
    while True:
        conn = await cmd_characteristic.written()
        print(cmd_characteristic.read())
        
async def main():
    control_task = asyncio.create_task(control_handler())
    advertising_task = asyncio.create_task(peripheral_advertise())
    await asyncio.gather(control_task)
    
asyncio.run(main())
