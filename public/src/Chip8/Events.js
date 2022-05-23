/**
 * Represents the event system of this Chip-8 machine
 */
export default class Events {
    /**
     * Constructs a new event system
     */
    constructor() {
        /**
         * @type {Map<String, Function[]>}
         */
        this.handlers = new Map()
    }

    /**
     * Listens to a specific event
     *
     * @param {String} event The event identifier
     * @param {Function} handler The handler that should be called when the event is triggered
     * @returns {void} No return operation
     */
    listen(event, handler) {
        if (! this.handlers.has(event))
            this.handlers.set(event, [])

        this.handlers.get(event).push(handler)
    }

    /**
     * Triggs a specific event
     *
     * @param {String} event The event identifier
     * @returns {void} No return operation
     */
    trigger(event) {
        if (! this.handlers.has(event))
            return

        for (const handler of this.handlers.get(event))
            handler()
    }
}
