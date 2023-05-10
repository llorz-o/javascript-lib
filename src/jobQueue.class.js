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

/**
 *
 const JobQueue = require('./jobQueue.class')

 const jobQueue = new JobQueue

 jobQueue.addJob((next, a) => {
     console.log('1')
     next();
 })
 jobQueue.addJob((next) => {
     console.log('2')
     next();
 })
 jobQueue.addJob((next) => {
     console.log('3')
     next();
 })
 jobQueue.addJob((next) => {
     console.log('4')
     next();
 })
 jobQueue.addJob((next) => {
     console.log('5')
     next();
 })

 jobQueue.addJob((next, a) => {
     next();
     console.log('6')
 })
 jobQueue.addJob((next) => {
     next();
     console.log('7')
 })
 jobQueue.addJob((next) => {
     next();
     console.log('8')
 })
 jobQueue.addJob((next) => {
     next();
     console.log('9')
 })
 jobQueue.addJob((next) => {
     next();
     console.log('10')
 })

 jobQueue.start().then(() => {
     console.log('finish');
 })
 
 */