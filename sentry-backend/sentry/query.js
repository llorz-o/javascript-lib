const db = require("./db");
const utils = require("./utils");

const pages = async (req, res) => {
  const { query } = req;
  const {
    page = 1,
    pageSize = 20,
    Ip,
    UUID,
    SessionUUID,
    FlushUUID,
    LogType,
    ExtraData,
  } = query || {};
  let docs = db.LogModel.where();

  if (Ip) docs = docs.where("Ip").equals(Ip);
  if (UUID) docs = docs.where("UUID").equals(UUID);
  if (SessionUUID) docs = docs.where("SessionUUID").equals(SessionUUID);
  if (FlushUUID) docs = docs.where("FlushUUID").equals(FlushUUID);
  if (LogType) docs = docs.where("ClientLogs.type").equals(LogType);
  if (ExtraData)
    docs = docs.where("Extra").regex(ExtraData);

  const count = await docs.clone().countDocuments().exec();

  docs
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .sort("field -TimeStamp");

  res.setHeader("Access-Control-Allow-Origin", "*");

  res.send({
    total: count,
    data: await docs.exec(),
  });
};

module.exports = {
  pages,
};
