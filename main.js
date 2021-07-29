import Config from './Chip8/Config.js'
import Machine from './Chip8/Machine.js'

const vm = new Machine(Config.instructions)

vm.memory[0x000] = 0x60
vm.memory[0x001] = 0x00

vm.memory[0x002] = 0x70
vm.memory[0x003] = 0x01

vm.memory[0x004] = 0x30
vm.memory[0x005] = 0x0A

vm.memory[0x006] = 0x10
vm.memory[0x007] = 0x02

vm.memory[0x008] = 0x10
vm.memory[0x009] = 0x00

setInterval(() => vm.cycle(), 1000 / 2)
