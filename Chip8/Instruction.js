import Config from './Config.js'
import Interpreter from './Interpreter.js'

export default class Instruction {

    /**
     * @type {Number} Instruction size of 2 bytes
     */
    static SIZE = 2

    /**
     * @param {Number} value
     */
    constructor(value) {
        this.value = value
        this.group = this.extract(Config.groupMask)
    }

    /**
     * Calls back the interpreter at the right execution
     *
     * @param {Interpreter} interpreter
     *
     * @return {void}
     * @throws {Error} If instruction is not supported
     */
    callback(interpreter) {
        if (! Config.instructions.has(this.code)) {
            throw new Error(`Not supported instruction. CODE: ${this.code}`)
        }

        const method = interpreter[Config.instructions.get(this.code)]
        method(this.data, this.x, this.y)
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
