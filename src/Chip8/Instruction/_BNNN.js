import Instruction from '../Instruction.js'
import Machine from '../Machine.js'

export default class _BNNN extends Instruction {

    /**
     * Executes the required operations on the virtual machine to accomplish the instruction
     *
     * @param {Machine} machine
     * @returns {Boolean} The need of a program counter increment
     */
    execute(machine) {
        machine.PC = this.NNN + machine.V[0]
        return false
    }
}