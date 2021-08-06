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

        peripherals.listen(machine.events)
    }

    start() {
        this.peripherals.audioPlayer.initialize(new AudioContext())

        const cycles = setInterval(() => {
            try {
                this.machine.cycle()
            } catch (error) {
                console.error(error)
                clearInterval(cycles)
            }
        }, 1000 / 500)

        setInterval(() => this.machine.updateTimers(), 1000 / 60 )
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
