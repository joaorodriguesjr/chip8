import Display from './Display.js'
import Keyboard from './Keyboard.js'
import Interpreter from './Interpreter.js'
import Machine from './Machine.js'

export default class Chip8 {
    static createVirtualMachine(displayCols, displayRows) {
        const keyboard = new Keyboard()
        const interpreter = new Interpreter()
        const display  = new Display(displayCols, displayRows)

        return new Machine(display, keyboard, interpreter)
    }
}
