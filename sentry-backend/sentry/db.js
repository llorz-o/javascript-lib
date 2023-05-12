const mongoose = require("mongoose");
console.log("mongoose connection");
mongoose.connect("mongodb://127.0.0.1:27017/sentry");

const clientLogsSchema = mongoose.Schema({
  page: String,
  type: String,
  consoleType: String,
  errorType: String,
  details: String,
});

const logSchema = mongoose.Schema({
  Ip: String,
  UUID: String,
  Date: String,
  Extra: String,
  SessionUUID: String,
  FlushUUID: String,
  TimeStamp: Number,
  ClientLogs: [clientLogsSchema],
});

module.exports = {
  LogModel: mongoose.model("Log", logSchema),
};
