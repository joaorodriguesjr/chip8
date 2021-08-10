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
        let rendererScale = 12

        if (window.innerWidth < 800)
            rendererScale = Math.round(window.innerWidth / 64)

        const canvas  = document.querySelector('#display-canvas')
        canvas.width  = display.cols * rendererScale
        canvas.height = display.rows * rendererScale

        const renderer = new Renderer(canvas, rendererScale)
        display.renderer = renderer

        const inputHandler = new InputHandler(keyboard, document)
        const audioPlayer = new AudioPlayer()

        return new Peripherals(renderer, inputHandler, audioPlayer)
    }
}
