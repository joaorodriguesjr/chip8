import Instruction from '../Instruction.js'
import Machine from '../Machine.js'

export default class _8XY5 extends Instruction {

    /**
     * Executes the required operations on the virtual machine to accomplish the instruction
     *
     * @param {Machine} machine
     * @returns {Boolean} The need of a program counter increment
     */
    execute(machine) {
        machine.VF = (machine.V[this.X] >= machine.V[this.Y]) ? 1 : 0
        machine.V[this.X] -= machine.V[this.Y]
        return true
    }
}
