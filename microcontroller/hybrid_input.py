# MIT license; Copyright (c) 2023-2024 Angus Gratton

# This file was originally MIT-licensed. Modified by Brylle Olaivar 
# When distributed as part of this project, it is covered by the project’s overall GPLv2 license.  

# Hybrid Interface for both mouse and keyboard controls
# Merged and amalgamated from:
# https://github.com/micropython/micropython-lib/blob/master/micropython/usb/usb-device-mouse/usb/device/mouse.py
# https://github.com/micropython/micropython-lib/blob/master/micropython/usb/usb-device-keyboard/usb/device/keyboard.py

from micropython import const
import struct
import machine
from usb.device.hid import HIDInterface

# Keyboard report layout
_KEY_ARRAY_LEN = const(6)  # up to 6 keys at once
_KEY_REPORT_LEN = const(_KEY_ARRAY_LEN + 2)  # Modifier + Reserved + 6 keys

class HybridInterface(HIDInterface):
    def __init__(self, interface_str="Pikurusu"):
        super().__init__(
            _HYBRID_REPORT_DESC,
            protocol=0,
            interface_str=interface_str,
        )

        # Mouse state
        self._l = False
        self._m = False
        self._r = False
        self._mouse_buf = bytearray(4)  # Report ID + 3 bytes

        # Keyboard state
        self._key_reports = [
            bytearray(_KEY_REPORT_LEN + 1),  # +1 for Report ID
            bytearray(_KEY_REPORT_LEN + 1),
        ]
        for r in self._key_reports:
            r[0] = 2  # Keyboard report ID = 2

    # Keyboard handling
    def on_set_report(self, report_data, _report_id, _report_type):
        if _report_id == 2:  # Keyboard
            self.on_led_update(report_data[0])

    def on_led_update(self, led_mask):
        pass

    def send_keys(self, down_keys, timeout_ms=100):
        r, s = self._key_reports
        r[0] = 2  # Report ID = 2
        r[1] = 0  # Modifier byte
        i = 3  # key array starts at byte index 2+1=3

        for k in down_keys:
            if k < 0: 
                r[1] |= -k
            elif i < _KEY_REPORT_LEN + 1:
                r[i] = k
                i += 1
            else:
                r[1] = 0
                for i in range(3, _KEY_REPORT_LEN + 1):
                    r[i] = 0xFF
                break

        while i < _KEY_REPORT_LEN + 1:
            r[i] = 0
            i += 1

        if self.send_report(r, timeout_ms):
            self._key_reports[0] = s
            self._key_reports[1] = r
            return True
        return False

    # Mouse handling
    def _mouse_report(self, dx=0, dy=0):
        b = 0
        if self._l: b |= 1 << 0
        if self._r: b |= 1 << 1
        if self._m: b |= 1 << 2

        while self.busy():
            machine.idle()

        struct.pack_into("BBbb", self._mouse_buf, 0, 1, b, dx, dy)  # ID=1
        return super().send_report(self._mouse_buf)

    def click_left(self, down=True):
        self._l = down
        return self._mouse_report()

    def click_middle(self, down=True):
        self._m = down
        return self._mouse_report()

    def click_right(self, down=True):
        self._r = down
        return self._mouse_report()

    def move_by(self, dx, dy):
        if not -127 <= dx <= 127:
            raise ValueError("dx")
        if not -127 <= dy <= 127:
            raise ValueError("dy")
        return self._mouse_report(dx, dy)

# Merged HID Descriptor
_HYBRID_REPORT_DESC = (
    # MOUSE REPORT (ID=1)
    b'\x05\x01'        # Usage Page (Generic Desktop)
    b'\x09\x02'        # Usage (Mouse)
    b'\xA1\x01'        # Collection (Application)
        b'\x85\x01'        #   Report ID (1)
        b'\x09\x01'        #   Usage (Pointer)
        b'\xA1\x00'        #   Collection (Physical)
            b'\x05\x09'        #     Usage Page (Buttons)
            b'\x19\x01'        #     Usage Min (1)
            b'\x29\x03'        #     Usage Max (3)
            b'\x15\x00'        #     Logical Min (0)
            b'\x25\x01'        #     Logical Max (1)
            b'\x95\x03'        #     Report Count (3)
            b'\x75\x01'        #     Report Size (1)
            b'\x81\x02'        #     Input (Data,Var,Abs)
            b'\x95\x01'        #     Report Count (1)
            b'\x75\x05'        #     Report Size (5)
            b'\x81\x01'        #     Input (Const,Array,Abs)
            b'\x05\x01'        #     Usage Page (Generic Desktop)
            b'\x09\x30'        #     Usage (X)
            b'\x09\x31'        #     Usage (Y)
            b'\x15\x81'        #     Logical Min (-127)
            b'\x25\x7F'        #     Logical Max (127)
            b'\x75\x08'        #     Report Size (8)
            b'\x95\x02'        #     Report Count (2)
            b'\x81\x06'        #     Input (Data,Var,Rel)
        b'\xC0'
    b'\xC0'

    # KEYBOARD REPORT (ID=2)
    b'\x05\x01'        # Usage Page (Generic Desktop)
    b'\x09\x06'        # Usage (Keyboard)
    b'\xA1\x01'        # Collection (Application)
        b'\x85\x02'        #   Report ID (2)
        b'\x05\x07'        #   Usage Page (Keyboard)
        b'\x19\xE0'        #   Usage Min (224)
        b'\x29\xE7'        #   Usage Max (231)
        b'\x15\x00'        #   Logical Min (0)
        b'\x25\x01'        #   Logical Max (1)
        b'\x75\x01'        #   Report Size (1)
        b'\x95\x08'        #   Report Count (8)
        b'\x81\x02'        #   Input (Data,Var,Abs) ; Modifier
        b'\x95\x01'        #   Report Count (1)
        b'\x75\x08'        #   Report Size (8)
        b'\x81\x01'        #   Input (Const,Array,Abs) ; Reserved
        b'\x95\x05'        #   Report Count (5)
        b'\x75\x01'        #   Report Size (1)
        b'\x05\x08'        #   Usage Page (LEDs)
        b'\x19\x01'        #   Usage Min (1)
        b'\x29\x05'        #   Usage Max (5)
        b'\x91\x02'        #   Output (Data,Var,Abs) ; LEDs
        b'\x95\x01'        #   Report Count (1)
        b'\x75\x03'        #   Report Size (3)
        b'\x91\x01'        #   Output (Const,Array,Abs) ; Padding
        b'\x95\x06'        #   Report Count (6)
        b'\x75\x08'        #   Report Size (8)
        b'\x15\x00'        #   Logical Min (0)
        b'\x25\x65'        #   Logical Max (101)
        b'\x05\x07'        #   Usage Page (Keyboard)
        b'\x19\x00'        #   Usage Min (0)
        b'\x29\x65'        #   Usage Max (101)
        b'\x81\x00'        #   Input (Data,Array)
    b'\xC0'
)

