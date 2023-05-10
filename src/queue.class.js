module.exports = class Queue {
    constructor() {
        let arr = [];
        //入队操作
        this.push = element => {
            arr.push(element);
            return true;
        }
        //出队操作
        this.pop = () => {
            return arr.shift()
        }
        //获取队首
        this.getFront = () => {
            return arr[0];
        }

        //获取队尾
        this.getRear = () => {
            return arr[arr.length - 1]
        }

        //清空队列
        this.clear = () => {
            arr = [];
        }

        //获取队长
        this.size = () => {
            return arr.length;
        }
    }
}
