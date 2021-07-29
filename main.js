import Config from './Chip8/Config.js'
import Machine from './Chip8/Machine.js'
import Display from './Chip8/Display.js'
import Renderer from './Renderer/Canvas.js'

const COLS = 64, ROWS = 32
const SCALE = 16

const canvas = document.querySelector('#display-canvas')
canvas.width  = COLS * SCALE
canvas.height = ROWS * SCALE

const display = new Display(COLS, ROWS)
const renderer = new Renderer(canvas, SCALE)

display.pixelOn(0, 0)
display.pixelOn(COLS - 1, ROWS - 1)
renderer.render(display)


const vm = new Machine(Config.instructions)

vm.memory[0x000] = 0x60
vm.memory[0x001] = 0x00

vm.memory[0x002] = 0x70
vm.memory[0x003] = 0x01

vm.memory[0x004] = 0x30
vm.memory[0x005] = 0x0A

vm.memory[0x006] = 0x10
vm.memory[0x007] = 0x02

vm.memory[0x008] = 0x10
vm.memory[0x009] = 0x00


setInterval(() => {

    vm.cycle()
    renderer.render(display)

}, 1000 / 2)
