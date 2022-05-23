export default class AudioPlayer {
    initialize(context) {
        this.playing = false
        this.context = context
        this.volume = context.createGain();
        this.volume.gain.value = 0.1;
        this.volume.connect(this.context.destination)
    }

    createOscilator() {
        this.oscillator = this.context.createOscillator()
        this.oscillator.type = 'triangle'
        this.oscillator.frequency.setValueAtTime(500, this.context.currentTime)
        this.oscillator.connect(this.volume)
    }

    play() {
        if (! this.context) {
            return
        }

        if (this.playing) {
            return
        }

        this.createOscilator()
        this.oscillator.start()

        this.playing = true
    }

    stop() {
        if (! this.playing) {
            return
        }

        this.oscillator.stop()
        this.oscillator.disconnect(this.volume)
        delete this.oscillator

        this.playing = false
    }
}
