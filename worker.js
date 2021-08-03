const timer = setInterval(() => self.postMessage('TIMER'), 1000 / 200 )
const clock = setInterval(() => self.postMessage('CLOCK'), 1000 / 60 )

self.onmessage = () => { }
