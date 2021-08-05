import Instruction from '../Instruction.js'
import Machine from '../Machine.js'

export default class _2NNN extends Instruction {

    /**
     * Executes the required operations on the virtual machine to accomplish the instruction
     *
     * @param {Machine} machine
     * @returns {Boolean} The need of a program counter increment
     */
    execute(machine) {
        machine.STACK[machine.SP] = (machine.PC + 2)
        machine.SP ++
        machine.PC = this.NNN

        return false
    }
}
