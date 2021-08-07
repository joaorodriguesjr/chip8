import Instruction from './Instruction.js'
import Mapper from './Mapper.js'

export default class Interpreter {

    /**
     * Interprets a 16-bit word turning it into an executable instruction
     *
     * @param {Number} word 16-bit word
     * @returns {Instruction} Instruction that represents the provided value
     */
    interpret(word) {
        if (! Mapper.hasMapping(word)) {
            throw new Error(`No supported instruction for: ${this.hex(word)}`)
        }

        const Constructor = Mapper.getMapping(word)
        return new Constructor(word)
    }

    /**
     * @param {Number} value
     * @returns {String}
     */
    hex(value) {
        return value.toString(16).padStart(4, '0')
    }
}
