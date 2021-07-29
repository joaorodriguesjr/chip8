import Config from './Config.js'

export default class Instruction {

    static SIZE = 2

    /**
     * @param {Number} value
     */
    constructor(value) {
        this.value = value
        this.group = this.extract(Config.groupMask)
    }

    /**
     * @return {Number}
     */
    extract(mask = 0xFFFF) {
        return this.value & mask
    }

    /**
     * @return {Number}
     */
    get code() {
        return this.extract(Config.codeMasks.get(this.group))
    }

    /**
     * @return {Number}
     */
     get data() {
        return this.extract(Config.dataMasks.get(this.group))
    }

    /**
     * @return {Number}
     */
     get x() {
        return this.extract(Config.xMasks.get(this.group)) >> 8
    }

    /**
     * @return {Number}
     */
     get y() {
        return this.extract(Config.yMasks.get(this.group)) >> 4
    }
}
