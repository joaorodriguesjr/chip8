import Instruction from '../Instruction.js'
import Machine from '../Machine.js'

export default class _DXYN extends Instruction {

    /**
     * Executes the required operations on the virtual machine to accomplish the instruction
     *
     * @param {Machine} machine
     * @returns {Boolean} The need of a program counter increment
     */
    execute(machine) {
        const SPRITE_WDTH = 8
        const SPRITE_HGHT = this.N

        const bit = (byte, col) => (byte & (0b10000000 >> col))

        for (let row = 0; row < SPRITE_HGHT; row ++) { const byte = machine.memory[machine.I + row]
        for (let col = 0; col < SPRITE_WDTH; col ++) {
            if (! bit(byte, col)) {
                continue
            }

            const pixel = machine.display.toggle(machine.V[this.X] + col, machine.V[this.Y] + row)
            machine.VF = (pixel ^ 1)
        }}

        machine.display.render()

        return true
    }
}
