import Events from './Events.js'
import Memory from './Memory.js'
import Display from './Display.js'
import Keyboard from './Keyboard.js'
import Interpreter from './Interpreter.js'

export default class Machine {

    /**
     * @param {Events} events
     * @param {Memory} memory
     * @param {Display} display
     * @param {Keyboard} keyboard
     * @param {Interpreter} interpreter
     */
    constructor(interpreter, memory, display, keyboard, events) {
        this.events = events
        this.memory = memory
        this.display = display
        this.keyboard = keyboard
        this.interpreter = interpreter

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
     * Loads a buffer into memory at the program space
     *
     * @param {ArrayBuffer} buffer The buffer data to be loaded
     * @returns {void} No return operation
     */
    load(buffer) {
        const data = new Uint8Array(buffer)

        for (const [address, byte] of data.entries()) {
            this.memory.write(this.PC + address, byte)
        }
    }

    /**
     * Executes a machine cycle
     *
     * @return {void}
     */
    cycle() {
        if (this.HLT) return

        const HI = this.memory.read(this.PC + 0)
        const LO = this.memory.read(this.PC + 1)

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

        if (this.ST > 0)
            this.events.trigger('SOUND_PLAY')
        else
            this.events.trigger('SOUND_STOP')
    }

     /**
     * Jumps to a specific memory address
     *
     * @param {Number} address 12-bit memory address to jump to
     * @returns {void} No return operation
     */
    jump(address) {
        this.PC = address
    }

    /**
     * Calls a subroutine at a specific memory address
     *
     * @param {Number} address 12-bit memory address to call the subroutine
     * @returns {void} No return operation
     */
    callSubroutine(address) {
        this.STACK[this.SP] = (this.PC + 2)
        this.SP ++
        this.PC = address
    }

    /**
     * Returns from subroutine to the return point stored in the stack
     *
     * @returns {void} No return operation
     */
    returnSubroutine() {
        this.SP --
        this.PC = this.STACK[this.SP]
    }
}
