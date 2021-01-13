const Pubsub = require("../pubsub.class.js");

// 注入给每个 worker 的函数
function injectActions(callback) {

    const events = {};

    this.onmessage = e => {
        const {
            data: {
                event,
                dispatch,
            }
        } = e;
        const eventList = events[event]
        if (eventList) {
            eventList.forEach(fn => fn(dispatch))
        }
    }

    return callback({
        emit: (event, dispatch) => {
            this.postMessage({
                event,
                dispatch
            })
        },
        on: (event, fn) => {
            const eventList = events[event]
            if (eventList) {
                eventList.push(fn)
                events[event] = eventList
            } else {
                events[event] = [fn]
            }
        }
    })
}

function WebWorker(woker) {
    if (!(this instanceof WebWorker)) {
        return new WebWorker(woker)
    }
    const code = woker.toString()
    const blob = new Blob([`(${code})(${injectActions.toString()})`])
    const worker = new Worker(URL.createObjectURL(blob))
    const events = {};

    worker.onmessage = e => {
        const {
            data: {
                event,
                dispatch,
            }
        } = e;
        const eventList = events[event]
        if (eventList) {
            eventList.forEach(fn => fn(dispatch))
        }
    }

    return {
        emit: (event, dispatch) => {
            worker.postMessage({
                event,
                dispatch
            })
        },
        on: (event, fn) => {
            const eventList = events[event]
            if (eventList) {
                eventList.push(fn)
                events[event] = eventList
            } else {
                events[event] = [fn]
            }
        },
        close: () => worker.close()
    }
}

module.exports = WebWorker