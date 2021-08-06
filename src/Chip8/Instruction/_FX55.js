import Instruction from '../Instruction.js'
import Machine from '../Machine.js'

export default class _FX55 extends Instruction {

    /**
     * Executes the required operations on the virtual machine to accomplish the instruction
     *
     * @param {Machine} machine
     * @returns {Boolean} The need of a program counter increment
     */
    execute(machine) {
        for (let offset = 0; offset <= this.X; offset ++) {
            machine.memory.read(machine.I + offset) = machine.V[offset]
        }

        return true
    }
}
