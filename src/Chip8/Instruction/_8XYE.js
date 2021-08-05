import Instruction from '../Instruction.js'
import Machine from '../Machine.js'

export default class _8XYE extends Instruction {

    /**
     * Executes the required operations on the virtual machine to accomplish the instruction
     *
     * @param {Machine} machine
     * @returns {Boolean} The need of a program counter increment
     */
    execute(machine) {
        machine.VF = machine.V[this.X] & 0b10000000
        machine.V[this.X] <<= 1
        return true
    }
}
