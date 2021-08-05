import Machine from './Machine.js'

export default class Instruction {

    /**
     * @param {Number} value
     */
    constructor(value) {
        this.value = value
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
        return this.value & mask
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
