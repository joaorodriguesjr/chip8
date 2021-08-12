import Machine from './Machine.js'
import Instruction from './Instruction.js'

class _00E0 extends Instruction {
    /**
     * Executes the required operations on the virtual machine to accomplish the instruction
     *
     * @param {Machine} machine
     * @returns {Boolean} The need of a program counter increment
     */
    execute(machine) {
        machine.display.clear()
        return true
    }
}

class _00EE extends Instruction {
    /**
     * Executes the required operations on the virtual machine to accomplish the instruction
     *
     * @param {Machine} machine
     * @returns {Boolean} The need of a program counter increment
     */
    execute(machine) {
        machine.returnSubroutine()
        return false
    }
}

class _0NNN extends Instruction {
    /**
     * Executes the required operations on the virtual machine to accomplish the instruction
     *
     * @param {Machine} machine
     * @returns {Boolean} The need of a program counter increment
     */
    execute(machine) {
        return true
    }
}

class _1NNN extends Instruction {
    /**
     * Executes the required operations on the virtual machine to accomplish the instruction
     *
     * @param {Machine} machine
     * @returns {Boolean} The need of a program counter increment
     */
    execute(machine) {
        machine.jump(this.NNN)
        return false
    }
}

class _2NNN extends Instruction {
    /**
     * Executes the required operations on the virtual machine to accomplish the instruction
     *
     * @param {Machine} machine
     * @returns {Boolean} The need of a program counter increment
     */
    execute(machine) {
        machine.callSubroutine(this.NNN)
        return false
    }
}

class _3XNN extends Instruction {
    /**
     * Executes the required operations on the virtual machine to accomplish the instruction
     *
     * @param {Machine} machine
     * @returns {Boolean} The need of a program counter increment
     */
    execute(machine) {
        machine.skipEquals(this.X, this.NN)
        return false
    }
}

class _4XNN extends Instruction {
    /**
     * Executes the required operations on the virtual machine to accomplish the instruction
     *
     * @param {Machine} machine
     * @returns {Boolean} The need of a program counter increment
     */
    execute(machine) {
        machine.skipNotEquals(this.X, this.NN)
        return false
    }
}

class _5XY0 extends Instruction {
    /**
     * Executes the required operations on the virtual machine to accomplish the instruction
     *
     * @param {Machine} machine
     * @returns {Boolean} The need of a program counter increment
     */
    execute(machine) {
        machine.skipEquals_XY(this.X, this.Y)
        return false
    }
}

class _6XNN extends Instruction {
    /**
     * Executes the required operations on the virtual machine to accomplish the instruction
     *
     * @param {Machine} machine
     * @returns {Boolean} The need of a program counter increment
     */
    execute(machine) {
        machine.define(this.X, this.NN)
        return true
    }
}

class _7XNN extends Instruction {
    /**
     * Executes the required operations on the virtual machine to accomplish the instruction
     *
     * @param {Machine} machine
     * @returns {Boolean} The need of a program counter increment
     */
    execute(machine) {
        machine.increment(this.X, this.NN)
        return true
    }
}

class _8XY0 extends Instruction {
    /**
     * Executes the required operations on the virtual machine to accomplish the instruction
     *
     * @param {Machine} machine
     * @returns {Boolean} The need of a program counter increment
     */
    execute(machine) {
        machine.define_XY(this.X, this.Y)
        return true
    }
}

class _8XY1 extends Instruction {
    /**
     * Executes the required operations on the virtual machine to accomplish the instruction
     *
     * @param {Machine} machine
     * @returns {Boolean} The need of a program counter increment
     */
    execute(machine) {
        machine.or_XY(this.X, this.Y)
        return true
    }
}

class _8XY2 extends Instruction {
    /**
     * Executes the required operations on the virtual machine to accomplish the instruction
     *
     * @param {Machine} machine
     * @returns {Boolean} The need of a program counter increment
     */
    execute(machine) {
        machine.and_XY(this.X, this.Y)
        return true
    }
}

class _8XY3 extends Instruction {
    /**
     * Executes the required operations on the virtual machine to accomplish the instruction
     *
     * @param {Machine} machine
     * @returns {Boolean} The need of a program counter increment
     */
    execute(machine) {
        machine.xor_XY(this.X, this.Y)
        return true
    }
}

class _8XY4 extends Instruction {
    /**
     * Executes the required operations on the virtual machine to accomplish the instruction
     *
     * @param {Machine} machine
     * @returns {Boolean} The need of a program counter increment
     */
    execute(machine) {
        machine.increment_XY(this.X, this.Y)
        return true
    }
}

class _8XY5 extends Instruction {
    /**
     * Executes the required operations on the virtual machine to accomplish the instruction
     *
     * @param {Machine} machine
     * @returns {Boolean} The need of a program counter increment
     */
    execute(machine) {
        machine.decrement_XY(this.X, this.Y)
        return true
    }
}

class _8XY6 extends Instruction {
    /**
     * Executes the required operations on the virtual machine to accomplish the instruction
     *
     * @param {Machine} machine
     * @returns {Boolean} The need of a program counter increment
     */
    execute(machine) {
        machine.shift_XR(this.X)
        return true
    }
}

class _8XY7 extends Instruction {
    /**
     * Executes the required operations on the virtual machine to accomplish the instruction
     *
     * @param {Machine} machine
     * @returns {Boolean} The need of a program counter increment
     */
    execute(machine) {
        machine.subtract_YX(this.Y, this.X)
        return true
    }
}

class _8XYE extends Instruction {
    /**
     * Executes the required operations on the virtual machine to accomplish the instruction
     *
     * @param {Machine} machine
     * @returns {Boolean} The need of a program counter increment
     */
    execute(machine) {
        machine.shift_XL(this.X)
        return true
    }
}

class _9XY0 extends Instruction {
    /**
     * Executes the required operations on the virtual machine to accomplish the instruction
     *
     * @param {Machine} machine
     * @returns {Boolean} The need of a program counter increment
     */
    execute(machine) {
        machine.skipNotEquals_XY(this.X, this.Y)
        return false
    }
}

class _ANNN extends Instruction {
    /**
     * Executes the required operations on the virtual machine to accomplish the instruction
     *
     * @param {Machine} machine
     * @returns {Boolean} The need of a program counter increment
     */
    execute(machine) {
        machine.I = this.NNN
        return true
    }
}

class _BNNN extends Instruction {
    /**
     * Executes the required operations on the virtual machine to accomplish the instruction
     *
     * @param {Machine} machine
     * @returns {Boolean} The need of a program counter increment
     */
    execute(machine) {
        machine.PC = this.NNN + machine.V[0]
        return false
    }
}

class _CXNN extends Instruction {
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

class _DXYN extends Instruction {
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

        for (let row = 0; row < SPRITE_HGHT; row ++) { const byte = machine.memory.read(machine.I + row)
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

class _EX9E extends Instruction {
    /**
     * Executes the required operations on the virtual machine to accomplish the instruction
     *
     * @param {Machine} machine
     * @returns {Boolean} The need of a program counter increment
     */
    execute(machine) {
        if (machine.keyboard.isPressed(machine.V[this.X])) {
            machine.PC += 4

            return false
        }

        return true
    }
}

class _EXA1 extends Instruction {
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

class _FX07 extends Instruction {
    /**
     * Executes the required operations on the virtual machine to accomplish the instruction
     *
     * @param {Machine} machine
     * @returns {Boolean} The need of a program counter increment
     */
    execute(machine) {
        machine.V[this.X] = machine.DT
        return true
    }
}

class _FX0A extends Instruction {
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

class _FX15 extends Instruction {
    /**
     * Executes the required operations on the virtual machine to accomplish the instruction
     *
     * @param {Machine} machine
     * @returns {Boolean} The need of a program counter increment
     */
    execute(machine) {
        machine.DT = machine.V[this.X]
        return true
    }
}

class _FX18 extends Instruction {
    /**
     * Executes the required operations on the virtual machine to accomplish the instruction
     *
     * @param {Machine} machine
     * @returns {Boolean} The need of a program counter increment
     */
    execute(machine) {
        machine.ST = machine.V[this.X]
        return true
    }
}

class _FX1E extends Instruction {
    /**
     * Executes the required operations on the virtual machine to accomplish the instruction
     *
     * @param {Machine} machine
     * @returns {Boolean} The need of a program counter increment
     */
    execute(machine) {
        machine.I += machine.V[this.X]
        return true
    }
}

class _FX29 extends Instruction {
    /**
     * Executes the required operations on the virtual machine to accomplish the instruction
     *
     * @param {Machine} machine
     * @returns {Boolean} The need of a program counter increment
     */
    execute(machine) {
        machine.I = machine.V[this.X] * 5
        return true
    }
}

class _FX33 extends Instruction {
    /**
     * Executes the required operations on the virtual machine to accomplish the instruction
     *
     * @param {Machine} machine
     * @returns {Boolean} The need of a program counter increment
     */
    execute(machine) {
        machine.memory.write(machine.I + 0, Math.floor(machine.V[this.X] / 100     ))
        machine.memory.write(machine.I + 1, Math.floor(machine.V[this.X] % 100 / 10))
        machine.memory.write(machine.I + 2, Math.floor(machine.V[this.X] % 10      ))

        return true
    }
}

class _FX55 extends Instruction {
    /**
     * Executes the required operations on the virtual machine to accomplish the instruction
     *
     * @param {Machine} machine
     * @returns {Boolean} The need of a program counter increment
     */
    execute(machine) {
        for (let offset = 0; offset <= this.X; offset ++) {
            machine.memory.write(machine.I + offset, machine.V[offset])
        }

        return true
    }
}

class _FX65 extends Instruction {
    /**
     * Executes the required operations on the virtual machine to accomplish the instruction
     *
     * @param {Machine} machine
     * @returns {Boolean} The need of a program counter increment
     */
    execute(machine) {
        for (let offset = 0; offset <= this.X; offset ++) {
            machine.V[offset] = machine.memory.read(machine.I + offset)
        }

        return true
    }
}

/**
 * Represents the Chip-8 instructions mapper.
 * Holds the machine instructions mapping providing its access methods.
 */
export default class Mapper {
    /**
     * The instructions mapping from opcode to instruction constructor
     *
     * @type {Map<Number, Function>}
     */
    static instructions = new Map([
        [0x00E0, _00E0], [0x00EE, _00EE],
        [0x0000, _0NNN], [0x1000, _1NNN], [0x2000, _2NNN], [0x3000, _3XNN],
        [0x4000, _4XNN], [0x5000, _5XY0], [0x6000, _6XNN], [0x7000, _7XNN],
        [0x8000, _8XY0], [0x8001, _8XY1], [0x8002, _8XY2], [0x8003, _8XY3],
        [0x8004, _8XY4], [0x8005, _8XY5], [0x8006, _8XY6], [0x8007, _8XY7],
        [0x800E, _8XYE], [0x9000, _9XY0], [0xA000, _ANNN], [0xB000, _BNNN],
        [0xC000, _CXNN], [0xD000, _DXYN], [0xE09E, _EX9E], [0xE0A1, _EXA1],
        [0xF007, _FX07], [0xF00A, _FX0A], [0xF015, _FX15], [0xF018, _FX18],
        [0xF01E, _FX1E], [0xF029, _FX29], [0xF033, _FX33], [0xF055, _FX55],
        [0xF065, _FX65],
    ])

    /**
     * The masks mapping from opcode group to opcode mask
     *
     * @type {Map<Number, Number>}
     */
    static masks = new Map([
        [0x0000, 0xF0FF], [0x1000, 0xF000], [0x2000, 0xF000], [0x3000, 0xF000],
        [0x4000, 0xF000], [0x5000, 0xF000], [0x6000, 0xF000], [0x7000, 0xF000],
        [0x8000, 0xF00F], [0x9000, 0xF000], [0xA000, 0xF000], [0xB000, 0xF000],
        [0xC000, 0xF000], [0xD000, 0xF000], [0xE000, 0xF0FF], [0xF000, 0xF0FF],
    ])

    /**
     * Extracts the opcode of a 16-bit word
     *
     * @param {Number} word 16-bit word
     * @returns {Number} The extracted opcode
     */
    static opcode(word) {
        return word & this.masks.get(word & 0xF000)
    }

    /**
     * Evaluates the existence of a mapping between a word and a valid instruction
     *
     * @param {Number} word 16-bit word
     * @returns {Boolean} The mapping evaluation
     */
    static hasMapping(word) {
        return this.instructions.has(this.opcode(word))
    }

    /**
     * Provides a mapping between a word and a valid instruction
     *
     * @param {Number} word 16-bit word
     * @returns {Function} The instruction constructor
     */
    static getMapping(word) {
        return this.instructions.get(this.opcode(word))
    }
}
