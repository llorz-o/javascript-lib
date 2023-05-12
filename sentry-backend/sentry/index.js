const path = require("path");
const db = require("./db");
const utils = require("./utils");
const post = (req, res) => {
  const { ip, ips, body } = req;
  const data = JSON.parse(body.d);

  console.log("ip", ip);
  db.LogModel.create({
    Date: new Date().toLocaleString(),
    Ip: ip.split(":").pop(),
    Extra: data.e,
    UUID: data.uu,
    SessionUUID: data.su,
    FlushUUID: data.fu,
    TimeStamp: data.t,
    ClientLogs: utils.safeParse(data.c),
  });
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.end();
};

const get = (req, res) => {
  const { ip, ips, query } = req;
  const data = JSON.parse(query.d);
  db.LogModel.create({
    Date: new Date().toLocaleString(),
    Ip: ip.split(":").pop(),
    Extra: data.e,
    UUID: data.uu,
    SessionUUID: data.su,
    FlushUUID: data.fu,
    TimeStamp: data.t,
    ClientLogs: utils.safeParse(data.c),
  });
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.sendFile(path.join(__dirname, "../tiny.png"));
};

module.exports = {
  get,
  post,
  postFormMulterFields: [
    {
      name: "uu",
      maxCount: 1,
    },
    {
      name: "su",
      maxCount: 1,
    },
    {
      name: "fu",
      maxCount: 1,
    },
    {
      name: "t",
      maxCount: 1,
    },
    {
      name: "c",
      maxCount: 1,
    },
  ],
};
