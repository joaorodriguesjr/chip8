import Config from './src/Chip8/Config.js'
import Display from './src/Chip8/Display.js'
import Keyboard from './src/Chip8/Keyboard.js'
import Machine from './src/Chip8/Machine.js'
import Interpreter from './src/Chip8/Interpreter.js'
import CanvasRenderer from './src/Canvas/Renderer.js'
import InputHandler from './src/Input/Handler.js'
import AudioPlayer from './src/Audio/Player.js'

const DISPLAY_COLS = 64, DISPLAY_ROWS = 32
const RENDERER_SCALE = 12

const canvas  = document.querySelector('#display-canvas')
canvas.width  = DISPLAY_COLS * RENDERER_SCALE
canvas.height = DISPLAY_ROWS * RENDERER_SCALE

const canvasRenderer = new CanvasRenderer(canvas, RENDERER_SCALE)
const display  = new Display(DISPLAY_COLS, DISPLAY_ROWS, canvasRenderer)
const keyboard = new Keyboard()
const interpreter = new Interpreter()
const machine = new Machine(display, keyboard, interpreter)
const audioPlayer = new AudioPlayer()
const inputHandler = new InputHandler(keyboard, document)

const start = () => {
    audioPlayer.initialize(new AudioContext())

    const cycleID = setInterval(() => {
        try {
            machine.cycle()
        } catch (error) {
            console.error(error)
            clearInterval(cycleID)
        }
    }, 1000 / 500)

    setInterval(() => {
        machine.updateTimers()

        if (machine.ST > 0)
            audioPlayer.play()
        else
            audioPlayer.stop()

    }, 1000 / 60 )
}

for (const [index, digit] of Config.digits.entries()) {
    machine.memory[index] = digit
}

fetch('./roms/pong.rom')
    .then(response => response.arrayBuffer())
    .then(buffer => {
        const data = new Uint8Array(buffer)

        for (const [index, byte] of data.entries()) {
            machine.memory[machine.PC + index] = byte
        }
    })

document.onclick = () => {
    if (audioPlayer.context) return
    start()
}
