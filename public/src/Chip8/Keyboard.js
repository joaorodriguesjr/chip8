export default class Keyboard {
    constructor() {
        this.keys = new Array(16)
        this.keys.fill(false)

        this.onKeyPress = () => {}
    }

    /**
     * @param {Number} key
     *
     * @return {Boolean}
     */
    isPressed(key) {
        return this.keys[key]
    }

    /**
     * @param {Number} key
     *
     * @return {void}
     */
    registerKeyPress(key) {
        this.keys[key] = true
        this.onKeyPress(key)
        this.onKeyPress = () => {}
    }

    /**
     * @param {Number} key
     *
     * @return {void}
     */
    registerKeyRelease(key) {
        this.keys[key] = false
    }

    /**
     * @param {Function} callback
     *
     * @return {Boolean}
     */
    waitKeyPress(callback) {
        this.onKeyPress = callback
    }
}
