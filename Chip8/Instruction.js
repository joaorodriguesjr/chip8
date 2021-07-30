import Config from './Config.js'
import Machine from './Machine.js'

export default class Instruction {

    static SIZE = 2

    /**
     * @param {Number} value
     */
    constructor(value) {
        this.value = value
        this.group = this.extract(Config.groupMask)
    }

    /**
     * Calls the instruction in the machine object
     *
     * @param {Machine} machine
     *
     * @return {void}
     * @throws {Error} If instruction is not supported
     */
    call(machine) {
        if (! Config.instructions.has(this.code)) {
            throw new Error(`Not supported instruction. CODE: ${this.code}`)
        }

        const method = Config.instructions.get(this.code)
        machine[method](this.data, this.x, this.y)
    }

    /**
     * @return {Number}
     */
    extract(mask = 0xFFFF) {
        return this.value & mask
    }

    /**
     * @return {Number}
     */
    get code() {
        return this.extract(Config.codeMasks.get(this.group))
    }

    /**
     * @return {Number}
     */
    get data() {
        return this.extract(Config.dataMasks.get(this.group))
    }

    /**
     * @return {Number}
     */
    get x() {
        return this.extract(Config.xMasks.get(this.group)) >> 8
    }

    /**
     * @return {Number}
     */
    get y() {
        return this.extract(Config.yMasks.get(this.group)) >> 4
    }
}
