export default class Display {
    /**
     * @param {Number} cols
     * @param {Number} rows
     */
    constructor(cols, rows) {
        this.cols = cols
        this.rows = rows

        this.initialize()
    }

    initialize() {
        /**
         * @type {Array<Pixel>}
         */
        this.pixels = []

        for (let row = 0; row < this.rows; row ++) {
        for (let col = 0; col < this.cols; col ++) {
            this.pixels[col + (row * this.cols)] = new Pixel(0, row, col)
        }}
    }

    clear() {
        this.initialize()
    }

    /**
     * Toggles a pixel at a given position
     *
     * @param {Number} col
     * @param {Number} row
     *
     * @return {Number} The new state of the pixel
     */
    toggle(col, row) {
        return this.pixels[col + (row * this.cols)].toggle()
    }

    /**
     * Calculates the pixel column based on index
     *
     * @param {Number} index
     * @return {Number}
     */
    col(index) {
        return index % this.cols
    }

    /**
     * Calculates the pixel row based on index
     *
     * @param {Number} index
     * @return {Number}
     */
    row(index) {
        return Math.floor(index / this.cols)
    }
}

class Pixel {
    /**
     * @param {NUmber} value
     * @param {Number} row
     * @param {Number} col
     */
    constructor(value, row, col) {
        this.value = value
        this.row = row
        this.col = col
    }

    toggle() {
        return this.value ^= 1
    }
}
