import Chip8 from './src/Chip8.js'

const chip8 = Chip8.create()
document.onclick = () => chip8.start()

fetch('./roms/breakout.rom')
    .then(response => response.arrayBuffer())
    .then(buffer => chip8.machine.load(buffer))
