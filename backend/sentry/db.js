const mongoose = require("mongoose");
console.log("mongoose connection");
mongoose.connect("mongodb://127.0.0.1:27017/sentry");

const clientLogsSchema = mongoose.Schema({
  type: String,
  consoleType: String,
  errorType: String,
  to: {
    fullPath: String,
    name: String,
  },
  from: {
    fullPath: String,
    name: String,
  },
  stack: String,
  message: String,
  info: String,
  sourceTagName: String,
  sourceId: String,
  sourceClassName: String,
  isRoot: String,
  sourceSrc: String,

  lineno: Number,
  colno: Number,
  filename: String,

  extra: String,
  explain: String,
  fetchURL: String,
  fetchStatus: Number,
  fetchStatusText: String,
  args: String,
});

const logSchema = mongoose.Schema({
  Ip: String,
  UUID: String,
  Date: String,
  Device: String,
  SessionUUID: String,
  FlushUUID: String,
  TimeStamp: Number,
  ClientLogs: String,
});

module.exports = {
  LogModel: mongoose.model("Log", logSchema),
};
