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

//display.pixelOn(0, 0)
//display.pixelOn(COLS - 1, ROWS - 1)
// renderer.render(display)


const vm = new Machine(display, Config.instructions)

vm.memory[0x000] = 0xF0
vm.memory[0x001] = 0x90
vm.memory[0x002] = 0xF0
vm.memory[0x003] = 0x90
vm.memory[0x004] = 0xF0

vm.V[1] = 5
vm.V[2] = 5

vm._DXYN(5, 1, 2)

renderer.render(display)

setInterval(() => {

    //vm.cycle()
    //renderer.render(display)

}, 1000 / 2)
