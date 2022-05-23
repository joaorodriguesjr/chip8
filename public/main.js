import Chip8 from './src/Chip8.js'

const chip8 = Chip8.create()
document.querySelector('#power').onclick = () => {
    const indicator = document.querySelector('.indicator')

    if (chip8.running)
        indicator.classList.remove('on')
    else
        indicator.classList.add('on')

    chip8.power()
}
document.querySelector('#reset').onclick = () => chip8.reset()


window.onresize = (event) => {
    const canvas = document.querySelector('.canvas')
    const scale = Math.round(window.innerWidth / 64) - 1
    canvas.width = scale * 64
    canvas.height = scale * 32
    chip8.peripherals.renderer.scale = scale
    chip8.peripherals.renderer.context.fillStyle = '#33ff66'
    chip8.machine.display.render()
}

fetch(`/roms/Chip8 emulator Logo [Garstyciuks].ch8`)
    .then(response => response.arrayBuffer())
    .then(buffer => {
        chip8.machine.reset()
        chip8.machine.load(buffer)
        chip8.start()
        document.querySelector('.indicator').classList.add('on')
    })

fetch(`/roms/list.json`)
    .then(response => response.json())
    .then(roms => {
        const parent = document.querySelector('#roms')

        let rom = 0
        document.querySelector('#prev').onclick = () => {
            rom--
            if (rom < 0)
                rom = roms.length - 1

            fetch(`/roms/${roms[rom].file}`)
            .then(response => response.arrayBuffer())
            .then(buffer => {
                chip8.machine.reset()
                chip8.machine.load(buffer)
                chip8.start()
            })

        }

        document.querySelector('#next').onclick = () => {
            rom++
            if (rom >= roms.length)
                rom = 0

            fetch(`/roms/${roms[rom].file}`)
            .then(response => response.arrayBuffer())
            .then(buffer => {
                chip8.machine.reset()
                chip8.machine.load(buffer)
                chip8.start()
            })

        }


        for (const rom of roms) {
            const label = document.createElement('label')

            const input = document.createElement('input')
            input.type = 'radio'
            input.name = 'rom'
            input.value = rom.file
            label.appendChild(input)

            const span = document.createElement('span')
            span.textContent = '- ' + rom.file
            label.appendChild(span)

            parent.appendChild(label)

            if (rom.file === 'Chip8 emulator Logo [Garstyciuks].ch8') {
                parent.scroll(0, label.offsetTop)
                input.checked = true
            }
        }

        const radios = document.querySelectorAll('input[name="rom"]')

        for (const radio of radios) {
            radio.onchange = (event) => {
                chip8.stop()

                fetch(`/roms/${event.target.value}`)
                    .then(response => response.arrayBuffer())
                    .then(buffer => {
                        chip8.machine.reset()
                        chip8.machine.load(buffer)
                        chip8.start()
                    })

                return
            }
        }
    })
