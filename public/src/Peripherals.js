import Renderer from './Peripherals/Renderer.js'
import AudioPlayer from './Peripherals/AudioPlayer.js'
import InputHandler from './Peripherals/InputHandler.js'

import Events from './Chip8/Events.js'
import Display from './Chip8/Display.js'
import Keyboard from './Chip8/Keyboard.js'

export default class Peripherals {

     /**
     * @param {Renderer} renderer
     * @param {InputHandler} inputHandler
     * @param {AudioPlayer} audioPlayer
     */
    constructor(renderer, inputHandler, audioPlayer) {
        this.renderer = renderer
        this.inputHandler = inputHandler
        this.audioPlayer = audioPlayer
    }

    /**
     * @param {Events} events
     */
    listen(events) {
        events.listen('SOUND_PLAY', () => this.audioPlayer.play())
        events.listen('SOUND_STOP', () => this.audioPlayer.stop())
    }

    /**
     * @param {Display} display
     * @param {Keyboard} keyboard
     */
    static create(display, keyboard) {
        const colWidth = (display.cols + 2)
        let scale = Math.floor(window.innerWidth / colWidth)
        let limit = Math.floor(800 / display.cols)

        if (scale > limit) {
            scale = limit
        }

        const canvas  = document.querySelector('.canvas')
        canvas.width  = display.cols * scale
        canvas.height = display.rows * scale

        const renderer = new Renderer(canvas, scale)
        display.renderer = renderer

        const inputHandler = new InputHandler(keyboard, document)
        const audioPlayer = new AudioPlayer()

        return new Peripherals(renderer, inputHandler, audioPlayer)
    }
}
