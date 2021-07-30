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
     * @param {Number} col
     * @param {Number} row
     * @param {Number} value
     */
    pixel(col, row, value = 1) {
        const index = col + (row * this.cols)
        const flipped = (this.data[index] === 1 && value === 0)
        this.data[index] = value

        return flipped
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
