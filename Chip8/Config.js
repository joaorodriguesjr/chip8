export default class Config {
    /**
     * N-- : 4-bit constant
     * NN- : 8-bit constant
     * NNN : Full address
     *
     * X : 4-bit register identifier
     * Y : 4-bit register identifier
     *
     * @type {Map<Number, String>}
     */
    static instructions = new Map([
        [0x00E0, '_00E0'], [0x00EE, '_00EE'],
        [0x0000, '_0NNN'], [0x1000, '_1NNN'], [0x2000, '_2NNN'], [0x3000, '_3XNN'],
        [0x4000, '_4XNN'], [0x5000, '_5XY0'], [0x6000, '_6XNN'], [0x7000, '_7XNN'],
        [0x8000, '_8XY0'], [0x8001, '_8XY1'], [0x8002, '_8XY2'], [0x8003, '_8XY3'],
        [0x8004, '_8XY4'], [0x8005, '_8XY5'], [0x8006, '_8XY6'], [0x8007, '_8XY7'],
    ])

    /**
     * @type {Array<Number>}
     */
    static groups = [
        0x0000, 0x1000, 0x2000, 0x3000,
        0x4000, 0x5000, 0x6000, 0x7000,
        0x8000, 0x9000, 0xA000, 0xB000,
        0xC000, 0xD000, 0xE000, 0xF000,
    ]

    /**
     * @type {Number}
     */
     static groupMask = 0xF000

    /**
     * @type {Map<Number, Number>}
     */
    static codeMasks = new Map([
        [0x0000, 0x0FFF], [0x1000, 0xF000], [0x2000, 0xF000], [0x3000, 0xF000],
        [0x4000, 0xF000], [0x5000, 0xF000], [0x6000, 0xF000], [0x7000, 0xF000],
        [0x8000, 0xF00F],
    ])

    /**
     * @type {Map<Number, Number>}
     */
     static dataMasks = new Map([
        [0x0000, 0x0FFF], [0x1000, 0x0FFF], [0x2000, 0x0FFF], [0x3000, 0x00FF],
        [0x4000, 0x00FF], [0x5000, 0x0000], [0x6000, 0x00FF], [0x7000, 0x00FF],
        [0x8000, 0x0000],
    ])

    /**
     * @type {Map<Number, Number>}
     */
     static xMasks = new Map([
        [0x0000, 0x0000], [0x1000, 0x0000], [0x2000, 0x0000], [0x3000, 0x0F00],
        [0x4000, 0x0F00], [0x5000, 0x0F00], [0x6000, 0x0F00], [0x7000, 0x0F00],
        [0x8000, 0x0F00],
    ])

    /**
     * @type {Map<Number, Number>}
     */
     static yMasks = new Map([
        [0x0000, 0x0000], [0x1000, 0x0000], [0x2000, 0x0000], [0x3000, 0x0000],
        [0x4000, 0x0000], [0x5000, 0x00F0], [0x6000, 0x00F0], [0x7000, 0x00F0],
        [0x8000, 0x00F0],
    ])

    static digits = [
        [0xF0, 0x90, 0x90, 0x90, 0xF0], /* 0 */
        [0x20, 0x60, 0x20, 0x20, 0x70], /* 1 */
        [0xF0, 0x10, 0xF0, 0x80, 0xF0], /* 2 */
    ]
}
