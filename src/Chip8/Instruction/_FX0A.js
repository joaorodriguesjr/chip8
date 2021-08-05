import Instruction from '../Instruction.js'
import Machine from '../Machine.js'

export default class _FX0A extends Instruction {

    /**
     * Executes the required operations on the virtual machine to accomplish the instruction
     *
     * @param {Machine} machine
     * @returns {Boolean} The need of a program counter increment
     */
    execute(machine) {
        machine.HLT = true

        const onKeyPress = (key) => { machine.HLT = false
            machine.V[this.X] = key
        }

        machine.keyboard.waitKeyPress(onKeyPress)
        return true
    }
}
