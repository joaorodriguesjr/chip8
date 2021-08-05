import Display from './Display.js'
import Keyboard from './Keyboard.js'
import Interpreter from './Interpreter.js'

export default class Machine {

    /**
     * @param {Display} display
     * @param {Keyboard} keyboard
     * @param {Interpreter} interpreter
     */
    constructor(display, keyboard, interpreter) {
        this.display = display
        this.keyboard = keyboard
        this.interpreter = interpreter

        /**
         * 4096 bytes of addressable memory
         */
        this.memory = new Uint8Array(0x1000)

        /**
         * 16 general purpose 8-bit registers
         */
        this.V = new Uint8Array(0x10)

        /**
         * 16-bit register for memory addressing
         */
        this.I = 0x0000

        /**
         * 16-bit stack for subroutine calls. Allowing 16 nested subroutines
         */
        this.STACK = new Uint16Array(0x10)

        /**
         * 4-bit stack pointer
         */
        this.SP = 0x0

        /**
         * 16-bit program counter
         */
        this.PC = 0x0200

        /**
         * Sound Timer
         */
        this.ST = 0x0

        /**
         * Delay Timer
         */
        this.DT = 0x0

        /**
         * The halting state
         */
        this.HLT = false
    }

    /**
     * @param {Number} value
     */
    set VF(value) {
        this.V[0xF] = value
    }

    /**
     * Executes a machine cycle
     *
     * @return {void}
     */
    cycle() {
        if (this.HLT) return

        const HI = this.memory[this.PC + 0]
        const LO = this.memory[this.PC + 1]

        const instruction = this.interpreter.interpret(HI << 8 | LO)
        const increment = instruction.execute(this)

        if (increment) this.PC += 2
    }

    /**
     * Updates the sound and delay timers
     *
     * @return {void}
     */
    updateTimers() {
        if (this.ST > 0) this.ST --
        if (this.DT > 0) this.DT --
    }
}
