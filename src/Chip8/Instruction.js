import Machine from './Machine.js'

/**
 * Represents a Chip-8 instruction.
 * Holds the current word (a 16-bit value) providing the access methods for its possible parameters like:
 *  - X (4-bit register identifier)
 *  - Y (4-bit register identifier)
 *  - N (4-bit value)
 *  - NN (8-bit value)
 *  - NNN (12-bit value)
 */
export default class Instruction {

    /**
     * @param {Number} data
     */
    constructor(data) {
        this.data = data
    }

    /**
     * Executes the required operations on the virtual machine to accomplish the instruction
     *
     * @param {Machine} machine
     * @returns {Boolean} The need of a program counter increment
     */
    execute(machine) {
        throw new Error('The execute method must be implemented in a child class')
    }

    /**
     * @access protected
     *
     * @return {Number}
     */
    extract(mask = 0xFFFF) {
        return this.data & mask
    }

    /**
     * @access protected
     *
     * @return {Number}
     */
    get X() {
        return this.extract(0x0F00) >> 8
    }

    /**
     * @access protected
     *
     * @return {Number}
     */
    get Y() {
        return this.extract(0x00F0) >> 4
    }

    /**
     * @access protected
     *
     * @return {Number}
     */
    get N() {
        return this.extract(0x000F)
    }

    /**
     * @access protected
     *
     * @return {Number}
     */
    get NN() {
        return this.extract(0x00FF)
    }

    /**
     * @access protected
     *
     * @return {Number}
     */
    get NNN() {
        return this.extract(0x0FFF)
    }
}
