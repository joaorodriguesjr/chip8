import Instruction from './Instruction.js'
import InstructionMap from './InstructionMap.js'

export default class Interpreter {

    /**
     * Interprets a 16-bit value turning it into an executable instruction
     *
     * @param {Number} data 16-bit value
     * @returns {Instruction} Instruction that represents the provided value
     */
    interpret(data) {
        const { masks, instructions } = InstructionMap
        const opcode = data & masks.get(data & 0xF000)

        if (! instructions.has(opcode)) {
            throw new Error(`No supported instruction for: ${hex(data)}`)
        }

        const Constructor = instructions.get(opcode)
        return new Constructor(data)
    }
}


/**
 * @param {Number} value
 * @returns {String}
 */
function hex(value) {
    return value.toString(16).padStart(4, '0')
}
