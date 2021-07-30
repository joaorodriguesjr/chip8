export default class Display {
    /**
     * @param {Number} cols
     * @param {Number} rows
     */
    constructor(cols, rows) {
        this.cols = cols
        this.rows = rows
        this.clear()
    }

    clear() {
        this.data = new Uint8Array(this.cols * this.rows)
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
        const index = col + (row * this.cols)
        return this.data[index] ^= 1
    }

    /**
     * @return {Array<Pixel>}
     */
    get pixels() {
        const mapper = (value, index) => {
            return new Pixel(value, this.col(index), this.row(index))
        }

        return Array.from(this.data).map(mapper)
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
     * @param {Number} col
     * @param {Number} row
     */
    constructor(value, col, row) {
        this.value = value
        this.col = col
        this.row = row
    }
}
