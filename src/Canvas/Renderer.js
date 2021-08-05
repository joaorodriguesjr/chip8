import Display from '../Chip8/Display.js'

export default class Renderer {
    /**
     * @param {HTMLCanvasElement} canvas
     * @param {Number} scale
     */
    constructor(canvas, scale) {
        this.context = canvas.getContext('2d')
        this.context.fillStyle = '#555555'
        this.scale = scale
    }

    /**
     * @param {Display} display
     */
    render(display) {
        this.context.clearRect(0, 0,  display.cols * this.scale, display.rows * this.scale)

        for (const pixel of display.pixels) {
            if (! pixel.value) continue

            const x = pixel.col * this.scale
            const y = pixel.row * this.scale

            this.context.fillRect(x, y, this.scale, this.scale)
            continue
        }

        return
    }
}
