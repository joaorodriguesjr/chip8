import Display from './Display.js'
import Keyboard from './Keyboard.js'
import Instruction from './Instruction.js'

export default class Machine {

    /**
     * Alias for (0b10000000 | 0x80 | 128) the
     * most significant bit
     */
    static MSB = 0b10000000

    /**
     * Alias for (0b00000001 | 0x01 | 1) the
     * least significant bit
     */
     static LSB = 0b00000001

    /**
     * @param {Display} display
     * @param {Keyboard} keyboard
     */
    constructor(display, keyboard) {
        this.display = display
        this.keyboard = keyboard

        /**
         * 4096 bytes of addressable memory
         */
        this.memory = new Uint8Array(0x1000)

        /**
         * 16 general purpose 8-bit registers
         */
        this.V = new Uint8Array(0x10)

        /**
         * Alias for this.V[F] register
         */
        this.VF = this.V[0xF]

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
     * Executes a machine cycle
     *
     * @return {void}
     */
    cycle() {
        if (this.HLT) return

        const HI = this.memory[this.PC + 0]
        const LO = this.memory[this.PC + 1]

        const instruction = new Instruction(HI << 8 | LO)
        instruction.call(this)
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

    /**
     * Clears the screen
     */
    _00E0() {
        this.display.clear()
        this.PC += Instruction.SIZE
    }

    /**
     * Returns from subroutine
     */
    _00EE() {
        this.SP --
        this.PC = this.STACK[this.SP]
    }

    /**
     * Not implemented instruction
     */
    _0NNN(_) {
        this.PC += Instruction.SIZE
    }

    /**
     * Jumps to address NNN
     */
    _1NNN(NNN) {
        this.PC = NNN
    }

    /**
     * Calls subroutine at NNN
     */
    _2NNN(NNN) {
        this.STACK[this.SP] = (this.PC + Instruction.SIZE)
        this.SP ++
        this.PC = NNN
    }

    /**
     * Skips the next instruction if VX equals NN
     */
    _3XNN(NN, X) {
        if (this.V[X] === NN) {
            this.PC += (Instruction.SIZE * 2)

            return
        }

        this.PC += Instruction.SIZE
    }

    /**
     * Skips the next instruction if VX does not equal NN
     */
    _4XNN(NN, X) {
        if (this.V[X] !== NN) {
            this.PC += (Instruction.SIZE * 2)

            return
        }

        this.PC += Instruction.SIZE
    }

    /**
     * Skips the next instruction if VX equals VY
     */
    _5XY0(_, X, Y) {
        if (this.V[X] === this.V[Y]) {
            this.PC += (Instruction.SIZE * 2)

            return
        }

        this.PC += Instruction.SIZE
    }

    /**
     * Sets VX to NN
     */
    _6XNN(NN, X) {
        this.V[X] = NN
        this.PC += Instruction.SIZE
    }

    /**
     * Adds NN to VX
     */
    _7XNN(NN, X) {
        this.V[X] += NN
        this.PC += Instruction.SIZE
    }

    /**
     * Sets VX to the value of VY
     */
    _8XY0(_, X, Y) {
        this.V[X] = this.V[Y]
        this.PC += Instruction.SIZE
    }

    /**
     * Sets VX to VX or VY
     *
     * @param {Number} _ Always zero parameter
     * @param {Number} X Register identifier
     * @param {Number} Y Register identifier
     *
     * @return {void}
     */
    _8XY1(_, X, Y) {
        this.V[X] = this.V[X] | this.V[Y]
        this.PC += Instruction.SIZE
    }

    /**
     * Sets VX to VX and VY
     *
     * @param {Number} _ Always zero parameter
     * @param {Number} X Register identifier
     * @param {Number} Y Register identifier
     *
     * @return {void}
     */
    _8XY2(_, X, Y) {
        this.V[X] = this.V[X] & this.V[Y]
        this.PC += Instruction.SIZE
    }

    /**
     * Sets VX to VX xor VY
     *
     * @param {Number} _ Always zero parameter
     * @param {Number} X Register identifier
     * @param {Number} Y Register identifier
     *
     * @return {void}
     */
    _8XY3(_, X, Y) {
        this.V[X] = this.V[X] ^ this.V[Y]
        this.PC += Instruction.SIZE
    }

    /**
     * Adds VY to VX. VF is set to 1 when there's a carry, and to 0 when there is not
     *
     * @param {Number} _ Always zero parameter
     * @param {Number} X Register identifier
     * @param {Number} Y Register identifier
     *
     * @return {void}
     */
    _8XY4(_, X, Y) {
        const sum = (this.V[X] += this.V[Y])
        this.VF = (sum > 0xFF) ? 1 : 0
        this.V[X] = sum
        this.PC += Instruction.SIZE
    }

    /**
     * VY is subtracted from VX. VF is set to 0 when there's a borrow, and 1 when there is not
     *
     * @param {Number} _ Always zero parameter
     * @param {Number} X Register identifier
     * @param {Number} Y Register identifier
     *
     * @return {void}
     */
    _8XY5(_, X, Y) {
        this.V[X] -= this.V[Y]
        this.VF = (this.V[X] >= this.V[Y]) ? 1 : 0
        this.PC += Instruction.SIZE
    }

    /**
     * Stores the least significant bit of VX in VF and then shifts VX to the right by 1
     *
     * @param {Number} _ Always zero parameter
     * @param {Number} X Register identifier
     * @param {Number} Y Register identifier
     *
     * @return {void}
     */
    _8XY6(_, X, Y) {
        this.VF = this.V[X] & Machine.LSB
        this.V[X] >>= 1
        this.PC += Instruction.SIZE
    }

    /**
     * Sets VX to VY minus VX. VF is set to 0 when there's a borrow, and 1 when there is not
     *
     * @param {Number} _ Always zero parameter
     * @param {Number} X Register identifier
     * @param {Number} Y Register identifier
     *
     * @return {void}
     */
    _8XY7(_, X, Y) {
        this.V[X] = (this.V[Y] - this.V[X])
        this.VF = (this.V[Y] > this.V[X]) ? 1 : 0
        this.PC += Instruction.SIZE
    }

    /**
     * Stores the most significant bit of VX in VF and then shifts VX to the left by 1
     *
     * @param {Number} _ Always zero parameter
     * @param {Number} X Register identifier
     * @param {Number} Y Register identifier
     *
     * @return {void}
     */
    _8XYE(_, X, Y) {
        this.VF = this.V[X] & Machine.MSB
        this.V[X] <<= 1
        this.PC += Instruction.SIZE
    }

    /**
     * Skips the next instruction if VX does not equal VY
     *
     * @param {Number} _ Always zero parameter
     * @param {Number} X Register identifier
     * @param {Number} Y Register identifier
     *
     * @return {void}
     */
    _9XY0(_, X, Y) {
        if (this.V[X] !== this.V[Y]) {
            this.PC += (Instruction.SIZE * 2)

            return
        }

        this.PC += Instruction.SIZE
    }

    /**
     * Sets I to the address NNN
     *
     * @param {Number} NNN 12-bit constant
     *
     * @return {void}
     */
    _ANNN(NNN) {
        this.I = NNN
        this.PC += Instruction.SIZE
    }

    /**
     * Jumps to the address NNN plus V0
     *
     * @param {Number} NNN 12-bit constant
     *
     * @return {void}
     */
    _BNNN(NNN) {
        this.PC = NNN + this.V[0]
    }

    /**
     * Sets VX to the result of a bitwise and operation on a random number (Typically: 0 to 255) and NN
     *
     * @param {Number} NN 8-bit constant
     * @param {Number} X Register identifier
     *
     * @return {void}
     */
    _CXNN(NN, X) {
        const random = Math.floor(Math.random() * 0xFF)
        this.V[X] = random & NN
        this.PC += Instruction.SIZE
    }

    /**
     * Draws a sprite at coordinate (VX, VY) that has a width of 8 pixels and a height of N+1 pixels.
     * Each row of 8 pixels is read as bit-coded starting from memory location I; I value does not change after the execution of this instruction.
     * As described above, VF is set to 1 if any screen pixels are flipped from set to unset when the sprite is drawn, and to 0 if that does not happen.
     *
     * @param {Number} N 4-bit constant
     * @param {Number} X Register identifier
     * @param {Number} Y Register identifier
     *
     * @return {void}
     */
    _DXYN(N, X, Y) {
        const SPRITE_WDTH = 8
        const SPRITE_HGHT = N

        let row = 0
        let col = 0

        const bit = (byte, col) => (byte & (Machine.MSB >> col))

        while (row < SPRITE_HGHT) { const byte = this.memory[this.I + row]
        while (col < SPRITE_WDTH) {

            if (bit(byte, col)) {
                const pixel = this.display.toggle(this.V[X] + col, this.V[Y] + row)
                this.VF = (pixel ^ 1)
            }

            col ++
        }
            col -= SPRITE_WDTH
            row ++
        }

        this.display.render()
        this.PC += Instruction.SIZE
    }

    /**
     * Skips the next instruction if the key stored in VX is pressed
     *
     * @param {Number} _ Always zero parameter
     * @param {Number} X Register identifier
     *
     * @return {void}
     */
    _EX9E(_, X) {
        if (this.keyboard.isPressed(this.V[X])) {
            this.PC += (Instruction.SIZE * 2)

            return
        }

        this.PC += Instruction.SIZE
    }

    /**
     * Skips the next instruction if the key stored in VX is not pressed
     *
     * @param {Number} _ Always zero parameter
     * @param {Number} X Register identifier
     *
     * @return {void}
     */
    _EXA1(_, X) {
        if (! this.keyboard.isPressed(this.V[X])) {
            this.PC += (Instruction.SIZE * 2)

            return
        }

        this.PC += Instruction.SIZE
    }

    /**
     * Sets VX to the value of the delay timer
     *
     * @param {Number} _ Always zero parameter
     * @param {Number} X Register identifier
     *
     * @return {void}
     */
    _FX07(_, X) {
        this.V[X] = this.DT
        this.PC += Instruction.SIZE
    }

    /**
     * A key press is awaited, and then stored in VX. (Blocking Operation. All instruction halted until next key event)
     *
     * @param {Number} _ Always zero parameter
     * @param {Number} X Register identifier
     *
     * @return {void}
     */
    _FX0A(_, X) {
        this.HLT = true

        const onKeyPress = (key) => { this.HLT = false
            this.V[X] = key
        }

        this.keyboard.waitKeyPress(onKeyPress)
        this.PC += Instruction.SIZE
    }

    /**
     * Sets the delay timer to VX
     *
     * @param {Number} _ Always zero parameter
     * @param {Number} X Register identifier
     *
     * @return {void}
     */
    _FX15(_, X) {
        this.DT = this.V[X]
        this.PC += Instruction.SIZE
    }

    /**
     * Sets the sound timer to VX
     *
     * @param {Number} _ Always zero parameter
     * @param {Number} X Register identifier
     *
     * @return {void}
     */
    _FX18(_, X) {
        this.ST = this.V[X]
        this.PC += Instruction.SIZE
    }

    /**
     * Adds VX to I. VF is not affected
     *
     * @param {Number} _ Always zero parameter
     * @param {Number} X Register identifier
     *
     * @return {void}
     */
    _FX1E(_, X) {
        this.I  += this.V[X]
        this.PC += Instruction.SIZE
    }

    /**
     * Sets I to the location of the sprite for the character in VX.
     * Characters 0-F (in hexadecimal) are represented by a 4x5 font
     *
     * @param {Number} _ Always zero parameter
     * @param {Number} X Register identifier
     *
     * @return {void}
     */
    _FX29(_, X) {
        this.I = this.V[X] * 5
        this.PC += Instruction.SIZE
    }

    /**
     * Stores the binary-coded decimal representation of VX, with the most significant of
     * three digits at the address in I, the middle digit at I plus 1, and the least significant digit at I plus 2.
     * (In other words, take the decimal representation of VX, place the hundreds digit in memory at
     * location in I, the tens digit at location I+1, and the ones digit at location I+2.)
     *
     * @param {Number} _ Always zero parameter
     * @param {Number} X Register identifier
     *
     * @return {void}
     */
    _FX33(_, X) {
        this.memory[this.I + 0] = Math.round(this.V[X] / 100)
        this.memory[this.I + 1] = Math.round(this.V[X] % 100 / 10)
        this.memory[this.I + 2] = Math.round(this.V[X] % 10)

        this.PC += Instruction.SIZE
    }

    /**
     * Stores V0 to VX (including VX) in memory starting at address I.
     * The offset from I is increased by 1 for each value written, but I itself is left unmodified
     *
     * @param {Number} _ Always zero parameter
     * @param {Number} X Register identifier
     *
     * @return {void}
     */
    _FX55(_, X) {
        for (let offset = 0; offset <= X; offset ++) {
            this.memory[this.I + offset] = this.V[offset]
        }

        this.PC += Instruction.SIZE
    }

    /**
     * Fills V0 to VX (including VX) with values from memory starting at address I.
     * The offset from I is increased by 1 for each value written, but I itself is left unmodified
     *
     * @param {Number} _ Always zero parameter
     * @param {Number} X Register identifier
     *
     * @return {void}
     */
    _FX65(_, X) {
        for (let offset = 0; offset <= X; offset ++) {
            this.V[offset] = this.memory[this.I + offset]
        }

        this.PC += Instruction.SIZE
    }
}
