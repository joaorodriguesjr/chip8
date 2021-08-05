import Instruction from '../Instruction.js'
import Machine from '../Machine.js'

export default class _00EE extends Instruction {

    /**
     * Executes the required operations on the virtual machine to accomplish the instruction
     *
     * @param {Machine} machine
     * @returns {Boolean} The need of a program counter increment
     */
    execute(machine) {
        machine.SP --
        machine.PC = machine.STACK[machine.SP]
        return false
    }
}
