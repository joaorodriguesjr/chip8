import Events from './Chip8/Events.js'
import Memory from './Chip8/Memory.js'
import Machine from './Chip8/Machine.js'
import Display from './Chip8/Display.js'
import Keyboard from './Chip8/Keyboard.js'
import Interpreter from './Chip8/Interpreter.js'
import Peripherals from './Peripherals.js'

export default class Chip8 {

    /**
     * @param {Machine} machine
     * @param {Peripherals} peripherals
     */
    constructor(machine, peripherals) {
        this.machine = machine
        this.peripherals = peripherals
        this.intervals = { cycles: null, timers: null }

        this.running = false
    }

    start() {
        if (this.running) return

        this.peripherals.audioPlayer.initialize(new AudioContext())
        this.peripherals.listen(this.machine.events)
        this.intervals.cycles = setInterval(() => this.machine.cycle()       , 2.0)
        this.intervals.timers = setInterval(() => this.machine.updateTimers(), 16.666 )

        this.running = true
    }

    stop() {
        clearInterval(this.intervals.cycles)
        clearInterval(this.intervals.timers)

        this.running = false
    }

    reset() {
        if (! this.running) return

        this.stop()
        this.machine.reset()
        this.start()
    }

    /**
     * @return {Chip8}
     */
    static create() {
        const events = new Events()
        const display = new Display()
        const keyboard = new Keyboard()
        const interpreter = new Interpreter()

        const memory = Memory.create()
        const machine = new Machine(interpreter, memory, display, keyboard, events)
        const peripherals = Peripherals.create(display, keyboard)

        return new Chip8(machine, peripherals)
    }
}
