import Config from './Chip8/Config.js'
import Machine from './Chip8/Machine.js'
import Display from './Chip8/Display.js'
import Keyboard from './Chip8/Keyboard.js'
import Renderer from './Renderer/Canvas.js'

const DISPLAY_COLS = 64, DISPLAY_ROWS = 32
const RENDERER_SCALE = 12

const canvas  = document.querySelector('#display-canvas')
canvas.width  = DISPLAY_COLS * RENDERER_SCALE
canvas.height = DISPLAY_ROWS * RENDERER_SCALE

const keyboard = new Keyboard()
const renderer = new Renderer(canvas, RENDERER_SCALE)
const display  = new Display(DISPLAY_COLS, DISPLAY_ROWS, renderer)

const vm = new Machine(display, keyboard)

const start = () => {
    const worker = new Worker('./worker.js')

    worker.onmessage = (event) => {
        if (event.data === 'CLOCK') vm.cycle()
        if (event.data === 'TIMER') vm.updateTimers()
    }
}

for (const [index, digit] of Config.digits.entries()) {
    vm.memory[index] = digit
}

fetch('./roms/opcode.rom')
    .then(response => response.arrayBuffer())
    .then(buffer => {
        const data = new Uint8Array(buffer)

        for (const [index, byte] of data.entries()) {
            vm.memory[vm.PC + index] = byte
        }

        start()
    })
