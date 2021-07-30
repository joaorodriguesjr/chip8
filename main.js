import Config from './Chip8/Config.js'
import Machine from './Chip8/Machine.js'
import Display from './Chip8/Display.js'
import Renderer from './Renderer/Canvas.js'

const COLS = 64, ROWS = 32
const SCALE = 10

const canvas = document.querySelector('#display-canvas')
canvas.width  = COLS * SCALE
canvas.height = ROWS * SCALE

const display = new Display(COLS, ROWS)
const renderer = new Renderer(canvas, SCALE)


const vm = new Machine(display, Config.instructions)

vm.memory[0x0100] = 0xBA
vm.memory[0x0101] = 0x7C
vm.memory[0x0102] = 0xD6
vm.memory[0x0103] = 0xFE
vm.memory[0x0104] = 0x54
vm.memory[0x0105] = 0xAA

vm.I = 0x0100
vm.V[1] = 5
vm.V[2] = 5

vm.memory[0x000] = 0xD1
vm.memory[0x001] = 0x26

setInterval(() => {

    vm.cycle()
    renderer.render(display)

}, 1000 / 2)
