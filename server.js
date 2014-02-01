const 
  PORT   = (process.env.OPENSHIFT_INTERNAL_PORT || 3000),
  IP     = (process.env.OPENSHIFT_NODEJS_IP || "localhost"),
  VIEWS  = __dirname + "/views",
  PUBLIC = __dirname + "/public"
;

var 
  express = require("express"),
  newrelic = require("newrelic"),
  config = require("./config.json"),
  Scraper = require("./scraper"),
  cron = require('./cron')(),
  app = module.exports = express()
;

Scraper.start();

app.use(express.logger());
app.set("views", VIEWS);
app.set("view engine", config.view);
app.use(app.router);
app.use(express.compress(config.gzip));
app.use(express.static(PUBLIC, config.static));

app.get("/", function(req, res) {
  Scraper.list(function(err, modules) {
    console.log(modules);
    res.format({
      "text/html": function(){
        return res.render("application", {
          site: config.site,
          modules: modules,
          domain: (req.protocol+"://"+req.host) 
        });
      },
      "application/json": function(){
        return res.json(200, modules);
      }
    });
  });
});

app.listen(PORT, IP, function() {
  console.log("Node Web Modules running on http://%s:%d", IP, PORT);
});