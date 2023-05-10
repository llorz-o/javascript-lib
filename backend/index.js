const Express = require("express");
const Sentry = require("./sentry");
const SentryQuery = require("./sentry/query");
const BodyParser = require("body-parser");
const Multer = require("multer");
const multer = Multer();
const app = Express();
const defaultPort = 80;

// app.use(BodyParser.json())
// app.use(BodyParser.urlencoded())
// app.use(BodyParser.urlencoded({
//     extended: true
// }))

app.post("/ajax", multer.none(), Sentry.post);
app.post("/beacon", multer.none(), Sentry.post);
app.get("/tiny.png", Sentry.get);

app.get("/pages", SentryQuery.pages);

app.listen(defaultPort, (err) => {
  if (err) return console.error(err.toString());
  console.log(`sentry server is running at port:${defaultPort}`);
});
