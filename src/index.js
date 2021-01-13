const WebWorker = require('./browser/worker.js')

const testWs = WebWorker(function (inject) {
    inject(({
        on,
        emit,
    }) => {
        on("fetch-get", function (url) {
            var oReq = new XMLHttpRequest();
            oReq.addEventListener("load", function (e) {

            });
            oReq.open("GET", url);
            oReq.send();
        })
    })
})

testWs.emit("fetch-get", "http://127.0.0.1:5500/get")
testWs.on("log", function (val) {
    console.log(val);
})