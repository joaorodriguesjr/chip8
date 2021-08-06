/**
 * Represents the Chip-8 system's memory
 */
export default class Memory {
    /**
     * Constructs a new memory object of a given capacity
     *
     * @param {Number} capacity the memory cpacity in bytes
     */
    constructor(capacity) {
        this.data = new Uint8ClampedArray(capacity)
    }

    /**
     * Reads data at a specific address
     *
     * @param {Number} address 12-bit address
     * @returns {Number} The data stored at the provided address
     */
    read(address) {
        return this.data[address]
    }


    /**
     * Writes data at a specific address
     *
     * @param {Number} address 12-bit address
     * @param {Number} data 8-bit data to be written
     * @returns {void} No return operation
     */
    write(address, data) {
        this.data[address] = data
    }

    /**
     * Creates a memory of 4096 bytes of capacity with the Chip-8 digits written in it
     *
     * @returns {Memory} The created memory
     */
    static create() {
        const memory = new Memory(4096)
        const digits = [
            0xF0, 0x90, 0x90, 0x90, 0xF0, /* 0 */
            0x20, 0x60, 0x20, 0x20, 0x70, /* 1 */
            0xF0, 0x10, 0xF0, 0x80, 0xF0, /* 2 */
            0xF0, 0x10, 0xF0, 0x10, 0xF0, /* 3 */
            0x90, 0x90, 0xF0, 0x10, 0x10, /* 4 */
            0xF0, 0x80, 0xF0, 0x10, 0xF0, /* 5 */
            0xF0, 0x80, 0xF0, 0x90, 0xF0, /* 6 */
            0xF0, 0x10, 0x20, 0x40, 0x40, /* 7 */
            0xF0, 0x90, 0xF0, 0x90, 0xF0, /* 8 */
            0xF0, 0x90, 0xF0, 0x10, 0xF0, /* 9 */
            0xF0, 0x90, 0xF0, 0x90, 0x90, /* A */
            0xE0, 0x90, 0xE0, 0x90, 0xE0, /* B */
            0xF0, 0x80, 0x80, 0x80, 0xF0, /* C */
            0xE0, 0x90, 0x90, 0x90, 0xE0, /* D */
            0xF0, 0x80, 0xF0, 0x80, 0xF0, /* E */
            0xF0, 0x80, 0xF0, 0x80, 0x80, /* F */
        ]

        for (const [address, digit] of digits.entries()) {
            memory.write(address, digit)
        }

        return memory
    }
}
