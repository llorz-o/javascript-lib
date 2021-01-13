const Queue = require("./queue.class.js");

module.exports = class JobQueue extends Queue {

    constructor() {
        super();

        let isStarted = false
        this.addJob = fn => this.push(fn)
        this.start = () => new Promise((resolve, reject) => {
            try {
                const start = () => {
                    const firstFn = this.getFront()
                    if (firstFn) {
                        firstFn(() => {
                            this.pop()
                            start()
                        })
                    } else {
                        // 当前没有元素
                        isStarted = false
                        resolve()
                    }
                }

                if (this.isStarted) {
                    // 队列已经开始
                    return console.warn("当前队列已经开始");
                } else {
                    isStarted = true
                    start()
                }
            } catch (error) {
                console.error(error);
                reject(error)
            }
        })
    }

}