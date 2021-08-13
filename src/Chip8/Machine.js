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

        this.initialize()
    }

    /**
     * Initializes the virtual machine state
     *
     * @returns {void} No return operation
     */
    initialize() {
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
     * Resets the virtual machine entire state
     *
     * @returns {void} No return operation
     */
    reset() {
        this.initialize()
        this.display.clear()
    }

    /**
     * Alias to register VF
     *
     * @param {Number} value
     * @returns {void} No return operation
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
        this.memory.clear()
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
        const word = (HI << 8 | LO)

        const instruction = this.interpreter.interpret(word)
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

    /**
     * Skips next instruction if register VX is equals the provided value
     *
     * @param {Number} X 4-bit register identifier
     * @param {Number} value 8-bit value to compare
     * @returns {void} No return operation
     */
    skipEquals(X, value) {
        if (this.V[X] === value)
            this.PC += 4
        else
            this.PC += 2
    }

    /**
     * Skips next instruction if register VX is not equals the provided value
     *
     * @param {Number} X 4-bit register identifier
     * @param {Number} value 8-bit value to compare
     * @returns {void} No return operation
     */
    skipNotEquals(X, value) {
        if (this.V[X] !== value)
            this.PC += 4
        else
            this.PC += 2
    }

    /**
     * Skips next instruction if register VX is equals to register VY
     *
     * @param {Number} X 4-bit register identifier
     * @param {Number} Y 4-bit register identifier
     * @returns {void} No return operation
     */
    skipEquals_XY(X, Y) {
        if (this.V[X] === this.V[Y])
            this.PC += 4
        else
            this.PC += 2
    }

    /**
     * Defines register VX with the provided value
     *
     * @param {Number} X 4-bit register identifier
     * @param {Number} value 8-bit value
     * @returns {void} No return operation
     */
    define(X, value) {
        this.V[X] = value
    }

    /**
     * Increments register VX with the provided value
     *
     * @param {Number} X 4-bit register identifier
     * @param {Number} value 8-bit value
     * @returns {void} No return operation
     */
    increment(X, value) {
        this.V[X] += value
    }

    /**
     * Defines register VX with the value of register VY
     *
     * @param {Number} X 4-bit register identifier
     * @param {Number} Y 4-bit register identifier
     * @returns {void} No return operation
     */
    define_XY(X, Y) {
        this.V[X] = this.V[Y]
    }

    /**
     * Defines register VX with the value of a bitwise OR operation between registers VX and VY
     *
     * @param {Number} X 4-bit register identifier
     * @param {Number} Y 4-bit register identifier
     * @returns {void} No return operation
     */
    or_XY(X, Y) {
        this.V[X] |= this.V[Y]
    }

    /**
     * Defines register VX with the value of a bitwise AND operation between registers VX and VY
     *
     * @param {Number} X 4-bit register identifier
     * @param {Number} Y 4-bit register identifier
     * @returns {void} No return operation
     */
    and_XY(X, Y) {
        this.V[X] &= this.V[Y]
    }

    /**
     * Defines register VX with the value of a bitwise XOR operation between registers VX and VY
     *
     * @param {Number} X 4-bit register identifier
     * @param {Number} Y 4-bit register identifier
     * @returns {void} No return operation
     */
    xor_XY(X, Y) {
        this.V[X] ^= this.V[Y]
    }

    /**
     * Increments register VX with the value of register VY.
     * Defines VF to 1 if there's a carry, and to 0 if not
     *
     * @param {Number} X 4-bit register identifier
     * @param {Number} Y 4-bit register identifier
     * @returns {void} No return operation
     */
    increment_XY(X, Y) {
        this.VF = (this.V[X] + this.V[Y] > 255) ? 1 : 0
        this.V[X] += this.V[Y]
    }

    /**
     * Decrements register VX with the value of register VY.
     * Defines VF to 0 if there's a borrow, and to 1 if not
     *
     * @param {Number} X 4-bit register identifier
     * @param {Number} Y 4-bit register identifier
     * @returns {void} No return operation
     */
    decrement_XY(X, Y) {
        this.VF = (this.V[X] >= this.V[Y]) ? 1 : 0
        this.V[X] -= this.V[Y]
    }

    /**
     * Stores the least significant bit of VX in VF and then shifts VX to the right by 1
     *
     * @param {Number} X 4-bit register identifier
     * @returns {void} No return operation
     */
    shift_XR(X) {
        this.VF = this.V[X] & 0b00000001
        this.V[X] >>= 1
    }

    /**
     * Subtracts the value of register VX off the value of register VY and stores the result in register VX.
     * Defines VF to 0 if there's a borrow, and to 1 if not
     *
     * @param {Number} Y 4-bit register identifier
     * @param {Number} X 4-bit register identifier
     * @returns {void} No return operation
     */
     subtract_YX(Y, X) {
        this.VF = (this.V[Y] >= this.V[X]) ? 1 : 0
        this.V[X] = (this.V[Y] - this.V[X])
    }

    /**
     * Stores the most significant bit of VX in VF and then shifts VX to the left by 1
     *
     * @param {Number} X 4-bit register identifier
     * @returns {void} No return operation
     */
    shift_XL(X) {
        this.VF = this.V[X] & 0b10000000
        this.V[X] <<= 1
    }

    /**
     * Skips next instruction if register VX is not equals to register VY
     *
     * @param {Number} X 4-bit register identifier
     * @param {Number} Y 4-bit register identifier
     * @returns {void} No return operation
     */
    skipNotEquals_XY(X, Y) {
        if (this.V[X] !== this.V[Y])
            this.PC += 4
        else
            this.PC += 2
    }

    /**
     * Defines register I with the provided value
     *
     * @param {Number} value 12-bit value
     * @returns {void} No return operation
     */
    define_I(value) {
        this.I = value
    }

    /**
    * Jumps to address plus V0
    *
    * @param {Number} address 12-bit memory address to jump to
    * @returns {void} No return operation
    */
   jump_V0(address) {
        this.PC = address + this.V[0]
   }
}
