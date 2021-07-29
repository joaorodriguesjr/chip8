import Instruction from './Instruction.js'

export default class Machine {

    /**
     * @param {Map<Number, String>} instructions
     */
    constructor(instructions) {
        this.instructions = instructions

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
        this.PC = 0x0000
    }

    /**
     * Executes a machine cycle
     */
    cycle() {
        const HI = this.memory[this.PC + 0]
        const LO = this.memory[this.PC + 1]

        const instruction = new Instruction(HI << 8 | LO)
        this.execute(instruction)
    }

    /**
     * @param {Instruction} instruction
     */
    execute(instruction) {
        if (! this.instructions.has(instruction.code)) {
            throw new Error(`Not supported instruction code: ${instruction.code}`)
        }

        const method = this.instructions.get(instruction.code)
        this[method](instruction.data, instruction.x, instruction.y)
    }

    /**
     * Clears the screen
     */
    _00E0() { }

    /**
     * Returns from subroutine
     */
    _00EE() {
        this.PC = this.STACK[this.SP]
        this.SP--
    }

    /**
     * Not implemented instruction
     */
    _0NNN(_) { }

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
        this.SP++
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
        this.VF = (this.V[X] > this.V[Y]) ? 1 : 0
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
        this.VF = this.V[X] & 1
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
        this.VF = this.V[X] & 128
        this.V[X] <<= 1
        this.PC += Instruction.SIZE
    }
}
