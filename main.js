import Chip8 from './src/Chip8.js'

const chip8 = Chip8.create()
document.querySelector('#start').onclick = () => chip8.start()
document.querySelector('#stop').onclick  = () => chip8.stop()

fetch('./roms/breakout.rom')
    .then(response => response.arrayBuffer())
    .then(buffer => chip8.machine.load(buffer))
