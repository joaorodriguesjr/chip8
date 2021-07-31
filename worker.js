const timer = setInterval(() => self.postMessage('TIMER'), 1000 / 1 )
const clock = setInterval(() => self.postMessage('CLOCK'), 1000 / 2 )

self.onmessage = () => { }
