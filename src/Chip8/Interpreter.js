import Instruction from './Instruction.js'

import _00E0 from './Instruction/_00E0.js'
import _00EE from './Instruction/_00EE.js'
import _0NNN from './Instruction/_0NNN.js'
import _1NNN from './Instruction/_1NNN.js'
import _2NNN from './Instruction/_2NNN.js'
import _3XNN from './Instruction/_3XNN.js'
import _4XNN from './Instruction/_4XNN.js'
import _5XY0 from './Instruction/_5XY0.js'
import _6XNN from './Instruction/_6XNN.js'
import _7XNN from './Instruction/_7XNN.js'
import _8XY0 from './Instruction/_8XY0.js'
import _8XY1 from './Instruction/_8XY1.js'
import _8XY2 from './Instruction/_8XY2.js'
import _8XY3 from './Instruction/_8XY3.js'
import _8XY4 from './Instruction/_8XY4.js'
import _8XY5 from './Instruction/_8XY5.js'
import _8XY6 from './Instruction/_8XY6.js'
import _8XY7 from './Instruction/_8XY7.js'
import _8XYE from './Instruction/_8XYE.js'
import _9XY0 from './Instruction/_9XY0.js'
import _ANNN from './Instruction/_ANNN.js'
import _BNNN from './Instruction/_BNNN.js'
import _CXNN from './Instruction/_CXNN.js'
import _DXYN from './Instruction/_DXYN.js'
import _EX9E from './Instruction/_EX9E.js'
import _EXA1 from './Instruction/_EXA1.js'
import _FX07 from './Instruction/_FX07.js'
import _FX0A from './Instruction/_FX0A.js'
import _FX15 from './Instruction/_FX15.js'
import _FX18 from './Instruction/_FX18.js'
import _FX1E from './Instruction/_FX1E.js'
import _FX29 from './Instruction/_FX29.js'
import _FX33 from './Instruction/_FX33.js'
import _FX55 from './Instruction/_FX55.js'
import _FX65 from './Instruction/_FX65.js'

/**
 * N-- : 4-bit constant
 * NN- : 8-bit constant
 * NNN : Full address
 *
 * X : 4-bit register identifier
 * Y : 4-bit register identifier
 *
 * @type {Map<Number, Function>}
 */
const instructions = new Map([
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
* @type {Map<Number, Number>}
*/
const codeMasks = new Map([
   [0x0000, 0xF0FF], [0x1000, 0xF000], [0x2000, 0xF000], [0x3000, 0xF000],
   [0x4000, 0xF000], [0x5000, 0xF000], [0x6000, 0xF000], [0x7000, 0xF000],
   [0x8000, 0xF00F], [0x9000, 0xF000], [0xA000, 0xF000], [0xB000, 0xF000],
   [0xC000, 0xF000], [0xD000, 0xF000], [0xE000, 0xF0FF], [0xF000, 0xF0FF],
])

/**
 * @param {Number} value
 * @returns {String}
 */
function hex(value) {
    return value.toString(16).padStart(4, '0')
}

export default class Interpreter {

    /**
     * Interprets a 16-bit value turning it into an executable instruction
     *
     * @param {Number} data 16-bit value
     * @returns {Instruction} Instruction that represents the provided value
     */
    interpret(data) {
        const group = (data & 0xF000)

        if (! codeMasks.has(group)) {
            throw new Error(`No instruction group for: ${hex(data)}`)
        }

        const code = (data & codeMasks.get(group))

        if (! instructions.has(code)) {
            throw new Error(`No supported instruction for: ${hex(data)}`)
        }

        const constructor = instructions.get(code)
        return new constructor(data)
    }
}
