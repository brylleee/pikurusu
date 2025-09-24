# License : GPLv2.0
# copyright (c) 2023  Dave Bailey
# Author: Dave Bailey (dbisu, @daveisu)

# Modified by Brylle Olaivar
# Added mouse support; ensure compatibility with Micropython

import re
import time
import random
from usb.device.keyboard import KeyCode

_CONTROLLER = None

duckyKeys = {
    'WINDOWS': KeyCode.LEFT_UI, 'RWINDOWS': KeyCode.RIGHT_UI, 'GUI': KeyCode.LEFT_UI, 'RGUI': KeyCode.RIGHT_UI,
    'COMMAND': KeyCode.LEFT_UI, 'RCOMMAND': KeyCode.RIGHT_UI,
    'SHIFT': KeyCode.LEFT_SHIFT, 'RSHIFT': KeyCode.RIGHT_SHIFT,
    'ALT': KeyCode.LEFT_ALT, 'RALT': KeyCode.RIGHT_ALT,
    'OPTION': KeyCode.LEFT_ALT, 'ROPTION': KeyCode.RIGHT_ALT,
    'CONTROL': KeyCode.LEFT_CTRL, 'CTRL': KeyCode.LEFT_CTRL, 'RCTRL': KeyCode.RIGHT_CTRL,
    
    'DOWNARROW': KeyCode.DOWN, 'DOWN': KeyCode.DOWN, 'LEFTARROW': KeyCode.LEFT,
    'LEFT': KeyCode.LEFT, 'RIGHTARROW': KeyCode.RIGHT, 'RIGHT': KeyCode.RIGHT,
    'UPARROW': KeyCode.UP, 'UP': KeyCode.UP,
    
    'BREAK': KeyCode.PAUSE, 'PAUSE': KeyCode.PAUSE, 'CAPSLOCK': KeyCode.CAPS_LOCK, 'DELETE': KeyCode.DELETE,
    'END': KeyCode.END, 'ESC': KeyCode.ESCAPE, 'ESCAPE': KeyCode.ESCAPE, 'HOME': KeyCode.HOME,
    'INSERT': KeyCode.INSERT, 'PAGEUP': KeyCode.PAGEUP, 'PAGEDOWN': KeyCode.PAGEDOWN,
    'PRINTSCREEN': KeyCode.PRINTSCREEN, 'SCROLLLOCK': KeyCode.SCROLL_LOCK,
    'ENTER': KeyCode.ENTER, 'SPACE': KeyCode.SPACE, 'TAB': KeyCode.TAB,
    'BACKSPACE': KeyCode.BACKSPACE,
    
    'A': KeyCode.A, 'B': KeyCode.B, 'C': KeyCode.C, 'D': KeyCode.D, 'E': KeyCode.E,
    'F': KeyCode.F, 'G': KeyCode.G, 'H': KeyCode.H, 'I': KeyCode.I, 'J': KeyCode.J,
    'K': KeyCode.K, 'L': KeyCode.L, 'M': KeyCode.M, 'N': KeyCode.N, 'O': KeyCode.O,
    'P': KeyCode.P, 'Q': KeyCode.Q, 'R': KeyCode.R, 'S': KeyCode.S, 'T': KeyCode.T,
    'U': KeyCode.U, 'V': KeyCode.V, 'W': KeyCode.W, 'X': KeyCode.X, 'Y': KeyCode.Y,
    'Z': KeyCode.Z,
    
    'F1': KeyCode.F1, 'F2': KeyCode.F2, 'F3': KeyCode.F3,
    'F4': KeyCode.F4, 'F5': KeyCode.F5, 'F6': KeyCode.F6, 'F7': KeyCode.F7,
    'F8': KeyCode.F8, 'F9': KeyCode.F9, 'F10': KeyCode.F10, 'F11': KeyCode.F11,
    'F12': KeyCode.F12
}

char_map = {
    'a': (KeyCode.A, 0), 'b': (KeyCode.B, 0), 'c': (KeyCode.C, 0), 'd': (KeyCode.D, 0),
    'e': (KeyCode.E, 0), 'f': (KeyCode.F, 0), 'g': (KeyCode.G, 0), 'h': (KeyCode.H, 0),
    'i': (KeyCode.I, 0), 'j': (KeyCode.J, 0), 'k': (KeyCode.K, 0), 'l': (KeyCode.L, 0),
    'm': (KeyCode.M, 0), 'n': (KeyCode.N, 0), 'o': (KeyCode.O, 0), 'p': (KeyCode.P, 0),
    'q': (KeyCode.Q, 0), 'r': (KeyCode.R, 0), 's': (KeyCode.S, 0), 't': (KeyCode.T, 0),
    'u': (KeyCode.U, 0), 'v': (KeyCode.V, 0), 'w': (KeyCode.W, 0), 'x': (KeyCode.X, 0),
    'y': (KeyCode.Y, 0), 'z': (KeyCode.Z, 0),

    'A': (KeyCode.A, KeyCode.LEFT_SHIFT), 'B': (KeyCode.B, KeyCode.LEFT_SHIFT),
    'C': (KeyCode.C, KeyCode.LEFT_SHIFT), 'D': (KeyCode.D, KeyCode.LEFT_SHIFT),
    'E': (KeyCode.E, KeyCode.LEFT_SHIFT), 'F': (KeyCode.F, KeyCode.LEFT_SHIFT),
    'G': (KeyCode.G, KeyCode.LEFT_SHIFT), 'H': (KeyCode.H, KeyCode.LEFT_SHIFT),
    'I': (KeyCode.I, KeyCode.LEFT_SHIFT), 'J': (KeyCode.J, KeyCode.LEFT_SHIFT),
    'K': (KeyCode.K, KeyCode.LEFT_SHIFT), 'L': (KeyCode.L, KeyCode.LEFT_SHIFT),
    'M': (KeyCode.M, KeyCode.LEFT_SHIFT), 'N': (KeyCode.N, KeyCode.LEFT_SHIFT),
    'O': (KeyCode.O, KeyCode.LEFT_SHIFT), 'P': (KeyCode.P, KeyCode.LEFT_SHIFT),
    'Q': (KeyCode.Q, KeyCode.LEFT_SHIFT), 'R': (KeyCode.R, KeyCode.LEFT_SHIFT),
    'S': (KeyCode.S, KeyCode.LEFT_SHIFT), 'T': (KeyCode.T, KeyCode.LEFT_SHIFT),
    'U': (KeyCode.U, KeyCode.LEFT_SHIFT), 'V': (KeyCode.V, KeyCode.LEFT_SHIFT),
    'W': (KeyCode.W, KeyCode.LEFT_SHIFT), 'X': (KeyCode.X, KeyCode.LEFT_SHIFT),
    'Y': (KeyCode.Y, KeyCode.LEFT_SHIFT), 'Z': (KeyCode.Z, KeyCode.LEFT_SHIFT),

    '1': (KeyCode.N1, 0), '!': (KeyCode.N1, KeyCode.LEFT_SHIFT),
    '2': (KeyCode.N2, 0), '@': (KeyCode.N2, KeyCode.LEFT_SHIFT),
    '3': (KeyCode.N3, 0), '#': (KeyCode.N3, KeyCode.LEFT_SHIFT),
    '4': (KeyCode.N4, 0), '$': (KeyCode.N4, KeyCode.LEFT_SHIFT),
    '5': (KeyCode.N5, 0), '%': (KeyCode.N5, KeyCode.LEFT_SHIFT),
    '6': (KeyCode.N6, 0), '^': (KeyCode.N6, KeyCode.LEFT_SHIFT),
    '7': (KeyCode.N7, 0), '&': (KeyCode.N7, KeyCode.LEFT_SHIFT),
    '8': (KeyCode.N8, 0), '*': (KeyCode.N8, KeyCode.LEFT_SHIFT),
    '9': (KeyCode.N9, 0), '(': (KeyCode.N9, KeyCode.LEFT_SHIFT),
    '0': (KeyCode.N0, 0), ')': (KeyCode.N0, KeyCode.LEFT_SHIFT),

    '-': (KeyCode.MINUS, 0), '_': (KeyCode.MINUS, KeyCode.LEFT_SHIFT),
    '=': (KeyCode.EQUAL, 0), '+': (KeyCode.EQUAL, KeyCode.LEFT_SHIFT),
    '[': (KeyCode.OPEN_BRACKET, 0), '{': (KeyCode.OPEN_BRACKET, KeyCode.LEFT_SHIFT),
    ']': (KeyCode.CLOSE_BRACKET, 0), '}': (KeyCode.CLOSE_BRACKET, KeyCode.LEFT_SHIFT),
    '\\': (KeyCode.BACKSLASH, 0), '|': (KeyCode.BACKSLASH, KeyCode.LEFT_SHIFT),
    ';': (KeyCode.SEMICOLON, 0), ':': (KeyCode.SEMICOLON, KeyCode.LEFT_SHIFT),
    "'": (KeyCode.QUOTE, 0), '"': (KeyCode.QUOTE, KeyCode.LEFT_SHIFT),
    ',': (KeyCode.COMMA, 0), '<': (KeyCode.COMMA, KeyCode.LEFT_SHIFT),
    '.': (KeyCode.DOT, 0), '>': (KeyCode.DOT, KeyCode.LEFT_SHIFT),
    '/': (KeyCode.SLASH, 0), '?': (KeyCode.SLASH, KeyCode.LEFT_SHIFT),
    '`': (KeyCode.GRAVE, 0), '~': (KeyCode.GRAVE, KeyCode.LEFT_SHIFT),
    ' ': (KeyCode.SPACE, 0)
}

variables = {"$_RANDOM_MIN": 0, "$_RANDOM_MAX": 65535}
defines = {}
functions = {}

held_keys = set()

defaultDelay = 0

letters = "abcdefghijklmnopqrstuvwxyz"
numbers = "0123456789"
specialChars = "!@#$%^&*()"

class IF:
    def __init__(self, condition, codeIter):
        self.condition = condition
        self.codeIter = list(codeIter)
        self.lastIfResult = None
    
    def _exitIf(self):
        _depth = 0
        for line in self.codeIter:
            line = self.codeIter.pop(0)
            line = line.strip()
            if line.upper().startswith("END_IF"):
                _depth -= 1
            elif line.upper().startswith("IF"):
                _depth += 1
            if _depth < 0:
                print("No else, exiting" + str(list(self.codeIter)))
                break
        return(self.codeIter)

    def runIf(self):
        if isinstance(self.condition, str):
            self.lastIfResult = evaluateExpression(self.condition)
        elif isinstance(self.condition, bool):
            self.lastIfResult = self.condition
        else:
            raise ValueError("Invalid condition type")

        # print(f"condition {self.condition} result is {self.lastIfResult} since \"$VAR\" is {variables["$VAR"]}, code is {self.codeIter}")
        depth = 0
        for line in self.codeIter:
            line = self.codeIter.pop(0)
            line = line.strip()
            if line == "":
                continue
            # print(line)

            if line.startswith("IF"):
                depth += 1
            elif line.startswith("END_IF"):
                if depth == 0:
                    return(self.codeIter, -1)
                depth -=1

            elif line.startswith("ELSE") and depth == 0:
                # print(f"ELSE LINE {line}, lastIfResult: {self.lastIfResult}")
                if self.lastIfResult is False:
                    line = line[4:].strip()  # Remove 'ELSE' and strip whitespace
                    if line.startswith("IF"):
                        nestedCondition = _getIfCondition(line)
                        # print(f"nested IF {nestedCondition}")
                        self.codeIter, self.lastIfResult = IF(nestedCondition, self.codeIter).runIf()
                        if self.lastIfResult == -1 or self.lastIfResult == True:
                            # print(f"self.lastIfResult {self.lastIfResult}")
                            return(self.codeIter, True)
                    else:
                        return IF(True, self.codeIter).runIf()                        #< Regular ELSE block
                else:
                    self._exitIf()
                    break

            # Process regular lines
            elif self.lastIfResult:
                # print(f"running line {line}")
                self.codeIter = list(parseLine(line, self.codeIter))
        # print("end of if")
        return(self.codeIter, self.lastIfResult)

def _getIfCondition(line):
    return str(line)[2:-4].strip()

def _isCodeBlock(line):
    line = line.upper().strip()
    if line.startswith("IF") or line.startswith("WHILE"):
        return True
    return False

def _getCodeBlock(linesIter):
    """Returns the code block starting at the given line."""
    code = []
    depth = 1
    for line in linesIter:
        line = line.strip()
        if line.upper().startswith("END_"):
            depth -= 1
        elif _isCodeBlock(line):
            depth += 1
        if depth <= 0:
            break
        code.append(line)
    return code

def evaluateExpression(expression):
    """Evaluates an expression with variables and returns the result."""
    # Replace variables (e.g., $FOO) in the expression with their values
    expression = re.sub(r"\$(\w+)", lambda m: str(variables.get(f"${m.group(1)}", 0)), expression)

    expression = expression.replace("^", "**")     #< Replace ^ with ** for exponentiation
    expression = expression.replace("&&", "and")
    expression = expression.replace("||", "or")

    return eval(expression, {}, variables)

def deepcopy(List):
    return(List[:])

def convertLine(line):
    commands = []
    # print(line)
    # loop on each key - the filter removes empty values
    for key in filter(None, line.split(" ")):
        key = key.upper()
        # find the KeyCode for the command in the list
        command_KeyCode = duckyKeys.get(key, None)
        if command_KeyCode is not None:
            # if it exists in the list, use it
            commands.append(command_KeyCode)
        elif hasattr(KeyCode, key):
            # if it's in the KeyCode module, use it (allows any valid KeyCode)
            commands.append(getattr(KeyCode, key))
        else:
            # if it's not a known key name, show the error for diagnosis
            print(f"Unknown key: <{key}>")
    # print(commands)
    return commands

def runScriptLine(line):
    keys = convertLine(line)
    for k in keys:
        _CONTROLLER.send_keys([k] + list(held_keys))
    for k in reversed(keys):
        _CONTROLLER.send_keys([] + list(held_keys))
        
def sendString(text):
    for ch in text:
        if ch not in char_map:
            print(f"Unsupported char: {ch}")
            continue
        key, modifier = char_map[ch]

        if modifier:
            _CONTROLLER.send_keys([modifier, key] + list(held_keys))  # press shift+key
        else:
            _CONTROLLER.send_keys([key] + list(held_keys))            # press key only

        _CONTROLLER.send_keys([] + list(held_keys))                   # release all
        time.sleep(0.05)


def replaceVariables(line):
    for var in variables:
        line = line.replace(var, str(variables[var]))
    return line

def replaceDefines(line):
    for define, value in defines.items():
        line = line.replace(define, value)
    return line

# Handles the function of every command for a single line
def parseLine(line, script_lines):
    global defaultDelay, variables, functions, defines
    line = line.strip()
    line = line.replace("$_RANDOM_INT", str(random.randint(int(variables.get("$_RANDOM_MIN", 0)), int(variables.get("$_RANDOM_MAX", 65535)))))
    line = replaceDefines(line)
    if line[:10] == "INJECT_MOD":
        line = line[11:]
    elif line.startswith("REM_BLOCK"):
        while line.startswith("END_REM") == False:
            script_iter = iter(script_lines)
            line = next(script_iter).strip()
            # print(line)
    elif(line[0:3] == "REM"):
        pass
    elif line.startswith("HOLD"):
        # HOLD command to press and hold a key
        key = line[5:].strip().upper()
        commandKeyCode = duckyKeys.get(key, None)
        if commandKeyCode:
            _CONTROLLER.send_keys([commandKeyCode] + list(held_keys))
            held_keys.add(commandKeyCode)
        else:
            print(f"Unknown key to HOLD: <{key}>")
    elif line.startswith("RELEASE"):
        # RELEASE command to release a held key
        key = line[8:].strip().upper()
        commandKeyCode = duckyKeys.get(key, None)
        if commandKeyCode in held_keys:
            held_keys.remove(commandKeyCode)
            
        if commandKeyCode:
            _CONTROLLER.send_keys([] + list(held_keys))
        else:
            print(f"Unknown key to RELEASE: <{key}>")
    elif(line[0:5] == "DELAY"):
        line = replaceVariables(line)
        time.sleep(float(line[6:])/1000)
    elif line == "STRINGLN":               #< stringLN block
        script_iter = iter(script_lines)
        line = next(script_iter).strip()
        line = replaceVariables(line)
        while line.startswith("END_STRINGLN") == False:
            sendString(line)
            _CONTROLLER.send_keys([KeyCode.ENTER] + list(held_keys))
            _CONTROLLER.send_keys([] + list(held_keys))
            script_iter = iter(script_lines)
            line = next(script_iter).strip()
            line = replaceVariables(line)
            line = replaceDefines(line)
    elif(line[0:8] == "STRINGLN"):
        sendString(replaceVariables(line[9:]))
        _CONTROLLER.send_keys([KeyCode.ENTER] + list(held_keys))
        _CONTROLLER.send_keys([] + list(held_keys))
    elif line == "STRING":                 #< string block
        script_iter = iter(script_lines)
        line = next(script_iter).strip()
        line = replaceVariables(line)
        while line.startswith("END_STRING") == False:
            sendString(line)
            script_iter = iter(script_lines)
            line = next(script_iter).strip()
            line = replaceVariables(line)
            line = replaceDefines(line)
    elif(line[0:6] == "STRING"):
        sendString(replaceVariables(line[7:]))
    elif(line[0:18] == "MOUSE_LEFT_RELEASE"):
        _CONTROLLER.click_left()
    elif(line[0:19] == "MOUSE_RIGHT_RELEASE"):
        _CONTROLLER.click_right()
    elif(line[0:20] == "MOUSE_MIDDLE_RELEASE"):
        _CONTROLLER.click_middle()
    elif(line[0:15] == "MOUSE_LEFT_HOLD"):
        _CONTROLLER.click_left()
    elif(line[0:16] == "MOUSE_RIGHT_HOLD"):
        _CONTROLLER.click_right()
    elif(line[0:17] == "MOUSE_MIDDLE_HOLD"):
        _CONTROLLER.click_middle()
    elif(line[0:10] == "MOUSE_LEFT"):
        _CONTROLLER.click_left(True)
        time.sleep(0.01)
        _CONTROLLER.click_left(False)
    elif(line[0:11] == "MOUSE_RIGHT"):
        _CONTROLLER.click_right()
        time.sleep(0.3)
        _CONTROLLER.click_right(False)
    elif(line[0:12] == "MOUSE_MIDDLE"):
        _CONTROLLER.click_middle()
        time.sleep(0.1)
        _CONTROLLER.click_middle(False)
    elif(line[0:5] == "MOUSE"):
        line = replaceVariables(line)
        print(line)
        delta = line[6:].split(" ")
        delta_x = max(-127, min(int(delta[0]), 127))
        delta_y = max(-127, min(int(delta[1]), 127))
        _CONTROLLER.move_by(delta_x, delta_y)
    elif(line[0:5] == "PRINT"):
        line = replaceVariables(line[6:])
        print("[SCRIPT]: " + line)
    elif(line[0:6] == "IMPORT"):
        runScript(line[7:])
    elif(line[0:13] == "DEFAULT_DELAY"):
        defaultDelay = int(line[14:]) * 10
    elif(line[0:12] == "DEFAULTDELAY"):
        defaultDelay = int(line[13:]) * 10
    elif(line[0:3] == "LED"):
        if(led.value == True):
            led.value = False
        else:
            led.value = True
    elif(line[0:3] == "LED"):
        if(led.value == True):
            led.value = False
        else:
            led.value = True
    elif(line[:7] == "LED_OFF"):
        led.value = False
    elif(line[:5] == "LED_R"):
        led.value = True
    elif(line[:5] == "LED_G"):
        led.value = True
    elif line.startswith("VAR"):
        match = re.match(r"VAR\s+\$(\w+)\s*=\s*(.+)", line)
        if match:
            varName = f"${match.group(1)}"
            value = evaluateExpression(match.group(2))
            variables[varName] = value
        else:
            raise SyntaxError(f"Invalid variable declaration: {line}")
    elif line.startswith("$"):
        match = re.match(r"\$(\w+)\s*=\s*(.+)", line)
        if match:
            varName = f"${match.group(1)}"
            expression = match.group(2)
            value = evaluateExpression(expression)
            variables[varName] = value
        else:
            raise SyntaxError(f"Invalid variable update, declare variable first: {line}")
    elif line.startswith("DEFINE"):
        defineLocation = line.find(" ")
        valueLocation = line.find(" ", defineLocation + 1)
        defineName = line[defineLocation+1:valueLocation]
        defineValue = line[valueLocation+1:]
        defines[defineName] = defineValue
    elif line.startswith("FUNCTION"):
        # print("ENTER FUNCTION")
        func_name = line.split()[1]
        functions[func_name] = []
        script_iter = iter(script_lines)
        line = next(script_iter).strip()
        while line != "END_FUNCTION":
            functions[func_name].append(line)
            script_iter = iter(script_lines)
            line = next(script_iter).strip()
    elif line.startswith("WHILE"):
        # print("ENTER WHILE LOOP")
        condition = line[5:].strip()
        loopCode = list(_getCodeBlock(script_lines))
        while evaluateExpression(condition) == True:
            currentIterCode = deepcopy(loopCode)
            print(loopCode)
            while currentIterCode:
                loopLine = currentIterCode.pop(0)
                currentIterCode = list(parseLine(loopLine, iter(currentIterCode)))      #< very inefficient, should be replaced later.

    elif line.upper().startswith("IF"):
        # print("ENTER IF")
        script_lines, ret = IF(_getIfCondition(line), script_lines).runIf()
        print(f"IF returned {ret} code")
    elif line.upper().startswith("END_IF"):
        pass
    elif line == "RAND_LOWERCASE_LETTER":
        sendString(random.choice(letters))
    elif line == "RAND_UPPERCASE_LETTER":
        sendString(random.choice(letters.upper()))
    elif line == "RAND_LETTER":
        sendString(random.choice(letters + letters.upper()))
    elif line == "RAND_NUMBER":
        sendString(random.choice(numbers))
    elif line == "RAND_SPECIAL":
        sendString(random.choice(specialChars))
    elif line == "RAND_CHAR":
        sendString(random.choice(letters + letters.upper() + numbers + specialChars))
    elif line == "VID_RANDOM" or line == "PID_RANDOM":
        for _ in range(4):
            sendString(random.choice("0123456789ABCDEF"))
    elif line == "MAN_RANDOM" or line == "PROD_RANDOM":
        for _ in range(12):
            sendString(random.choice(letters + letters.upper() + numbers))
    elif line == "SERIAL_RANDOM":
        for _ in range(12):
            sendString(random.choice(letters + letters.upper() + numbers + specialChars))
    elif line == "RESET":
        _CONTROLLER.send_keys([])
    elif line in functions:
        updated_lines = []
        inside_while_block = False
        for func_line in functions[line]:
            if func_line.startswith("WHILE"):
                inside_while_block = True  # Start skipping lines
                updated_lines.append(func_line)
            elif func_line.startswith("END_WHILE"):
                inside_while_block = False  # Stop skipping lines
                updated_lines.append(func_line)
                parseLine(updated_lines[0], iter(updated_lines))
                updated_lines = []  # Clear updated_lines after parsing
            elif inside_while_block:
                updated_lines.append(func_line)
            elif not (func_line.startswith("END_WHILE") or func_line.startswith("WHILE")):
                parseLine(func_line, iter(functions[line]))
    else:
        runScriptLine(line)
    
    return(script_lines)

# Takes in an array of 'lines' consisting of commands
# calls parseLine() for every line
# except for RESTART_PAYLOAD which starts over
# and STOP_PAYLOAD which stops it completely
def runScript(script_lines):
    global defaultDelay
    restart = True

    while restart:
        restart = False

        previousLine = ""
        for line in script_lines:
            print(f"runScript: {line}")
            if(line[0:6] == "REPEAT"):
                for i in range(int(line[7:])):
                    #repeat the last command
                    parseLine(previousLine, script_lines)
                    time.sleep(float(defaultDelay) / 1000)
            elif line.startswith("RESTART_PAYLOAD"):
                restart = True
                break
            elif line.startswith("STOP_PAYLOAD"):
                restart = False
                break
            else:
                parseLine(line, script_lines)
                previousLine = line
            time.sleep(float(defaultDelay) / 1000)
            
def init(controller):
    global _CONTROLLER
    _CONTROLLER = controller

