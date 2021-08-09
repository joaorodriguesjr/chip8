import Chip8 from './src/Chip8.js'

const chip8 = Chip8.create()
document.querySelector('#start').onclick = () => chip8.start()
document.querySelector('#reset').onclick = () => chip8.reset()


fetch(`/roms/Chip8 emulator Logo [Garstyciuks].ch8`)
    .then(response => response.arrayBuffer())
    .then(buffer => {
        chip8.machine.reset()
        chip8.machine.load(buffer)
        chip8.start()
    })

fetch(`/roms/list.json`)
    .then(response => response.json())
    .then(roms => {
        const parent = document.querySelector('#roms')

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
