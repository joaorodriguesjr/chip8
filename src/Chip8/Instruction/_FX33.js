import Instruction from '../Instruction.js'
import Machine from '../Machine.js'

export default class _FX33 extends Instruction {

    /**
     * Executes the required operations on the virtual machine to accomplish the instruction
     *
     * @param {Machine} machine
     * @returns {Boolean} The need of a program counter increment
     */
    execute(machine) {
        machine.memory[machine.I + 0] = Math.floor(machine.V[this.X] / 100)
        machine.memory[machine.I + 1] = Math.floor(machine.V[this.X] % 100 / 10)
        machine.memory[machine.I + 2] = Math.floor(machine.V[this.X] % 10)

        return true
    }
}
