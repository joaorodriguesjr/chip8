import Chip8 from './src/Chip8.js'

const chip8 = Chip8.create()
const indicator = document.querySelector('.indicator')
const romDisplay = document.querySelector('.rom')

function fetchRom(url) {
    fetch(url).then(response => response.arrayBuffer()).then(buffer => {
        chip8.machine.reset()
        chip8.machine.load(buffer)
        chip8.start()

        indicator.classList.add('on')
    })
}

document.querySelector('#power').onclick = () => {
    if (chip8.running)
        indicator.classList.remove('on')
    else
        indicator.classList.add('on')

    chip8.power()
}

document.querySelector('#reset').onclick = () => chip8.reset()


window.onresize = (event) => {
    const display = chip8.machine.display
    const canvas = document.querySelector('.canvas')
    const scale = Math.floor(window.innerWidth / (display.cols + 2))

    canvas.width = scale * display.cols
    canvas.height = scale * display.rows
    chip8.peripherals.renderer.scale = scale
    chip8.peripherals.renderer.context.fillStyle = '#33ff66'
    chip8.machine.display.render()
}

romDisplay.innerText = 'Chip8 emulator Logo [Garstyciuks].ch8'
fetchRom(`/roms/${romDisplay.innerText}`)

fetch(`/roms/list.json`)
    .then(response => response.json()).then(roms => {
        let current = 0

        document.querySelector('#prev').onclick = () => {
            current--
            if (current < 0)
                current = roms.length - 1

            fetchRom(`/roms/${roms[current].file}`)
            romDisplay.innerText = roms[current].file
        }

        document.querySelector('#next').onclick = () => {
            current++
            if (current >= roms.length)
            current = 0

            fetchRom(`/roms/${roms[current].file}`)
            romDisplay.innerText = roms[current].file
        }
    })
