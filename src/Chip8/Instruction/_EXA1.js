import Instruction from '../Instruction.js'
import Machine from '../Machine.js'

export default class _EXA1 extends Instruction {

    /**
     * Executes the required operations on the virtual machine to accomplish the instruction
     *
     * @param {Machine} machine
     * @returns {Boolean} The need of a program counter increment
     */
    execute(machine) {
        if (! machine.keyboard.isPressed(machine.V[this.X])) {
            machine.PC += 4

            return false
        }

        return true
    }
}
