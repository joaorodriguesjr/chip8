import Keyboard from '../Chip8/Keyboard.js'

export default class InputHandler {
    /**
     * @param {Keyboard} keyboard
     * @param {HTMLDocument} docuemnt
     */
    constructor(keyboard, document) {
        this.keyboard = keyboard
        document.addEventListener('keydown', (event) => this.onKeyDown(event.keyCode))
        document.addEventListener('keyup'  , (event) => this.onKeyUp(event.keyCode))

        /**
         * @type {Map<Number, Number>}
         */
        this.keys = new Map([
            [88, 0x00],
            [49, 0x01],
            [50, 0x02],
            [51, 0x03],
            [81, 0x04],
            [87, 0x05],
            [69, 0x06],
            [65, 0x07],
            [83, 0x08],
            [68, 0x09],
            [90, 0x0A],
            [67, 0x0B],
            [52, 0x0C],
            [82, 0x0D],
            [70, 0x0E],
            [86, 0x0F]
        ])

        document.querySelectorAll('.key').forEach(key => {
            const keyCode = parseInt(key.dataset.key, 16)
            this.keys.set(keyCode, keyCode)

            key.addEventListener('mousedown', () => {
                this.onKeyDown(keyCode)
            })

            key.addEventListener('mouseup', () => {
                this.onKeyUp(keyCode)
            })

            key.addEventListener('touchstart', () => {
                this.onKeyDown(keyCode)
            })

            key.addEventListener('touchend', () => {
                this.onKeyUp(keyCode)
            })
        })
    }

    /**
     * @param {Number} key
     *
     * @return {void}
     */
    onKeyDown(key) {
        if (! this.keys.has(key)) {
            return
        }

        this.keyboard.registerKeyPress(this.keys.get(key))
    }

    /**
     * @param {Number} key
     *
     * @return {void}
     */
    onKeyUp(key) {
        if (! this.keys.has(key)) {
            return
        }

        this.keyboard.registerKeyRelease(this.keys.get(key))
    }
}
