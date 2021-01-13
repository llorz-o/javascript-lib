module.exports = class PubSub {
    constructor() {

        let identity = 0
        const Pool = {}

        this.on = (eventName, fn) => {
            const eventQueue = Pool[eventName] || []
            fn._identity = identity
            identity++
            eventQueue.push(fn)
            Pool[eventName] = eventQueue
        }

        this.emit = (eventName, ...args) => {
            const eventQueue = Pool[eventName] || []
            eventQueue.forEach(fn => fn(...args))
        }

        this.remove = (eventName, fn) => {
            const eventQueue = Pool[eventName] || []
            Pool[eventName] = fn === undefined ? [] : eventQueue.filter(_fn => _fn.identity !== fn.identity)
        }

        this.once = (eventName, fn) => {
            const decoration = function (...args) {
                fn(...args)
                this.remove(eventName, decoration)
            }
            this.on(eventName, decoration)
        }

    }
}