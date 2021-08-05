import Instruction from '../Instruction.js'
import Machine from '../Machine.js'

export default class _FX65 extends Instruction {

    /**
     * Executes the required operations on the virtual machine to accomplish the instruction
     *
     * @param {Machine} machine
     * @returns {Boolean} The need of a program counter increment
     */
    execute(machine) {
        for (let offset = 0; offset <= this.X; offset ++) {
            machine.V[offset] = machine.memory[machine.I + offset]
        }

        return true
    }
}
