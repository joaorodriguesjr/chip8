import Instruction from '../Instruction.js'
import Machine from '../Machine.js'

export default class _CXNN extends Instruction {

    /**
     * Executes the required operations on the virtual machine to accomplish the instruction
     *
     * @param {Machine} machine
     * @returns {Boolean} The need of a program counter increment
     */
    execute(machine) {
        const random = Math.floor(Math.random() * 0xFF)
        machine.V[this.X] = random & this.NN
        return true
    }
}
