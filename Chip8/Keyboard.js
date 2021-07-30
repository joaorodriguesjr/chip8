export default class Keyboard {
    constructor() {
        this.keys = new Array(16)
        this.keys.fill(false)

        this.keyPressCallback = () => {}
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
     * @return {Boolean}
     */
    registerKeyPress(key) {
        this.keys[key] = true
        this.keyPressCallback(key)
        this.keyPressCallback = () => {}
    }

    /**
     * @param {Function} callback
     *
     * @return {Boolean}
     */
    waitKeyPress(callback) {
        this.keyPressCallback = callback
    }
}
