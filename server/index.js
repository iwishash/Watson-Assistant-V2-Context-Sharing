var responseTime = require("response-time");
var parseAddress = require("parse-address-string");
const express = require("express");
const app = express();

var cors = require("cors");
app.use(cors());

var { assistant } = require("./watsonAssistant.js");

var bodyParser = require("body-parser"); // parser for post requests

var sessionid = null;
var assistantid = "assistantid";

require("dotenv").config({ silent: true });

app.use(
  bodyParser.json({
    limit: "5mb"
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(express.static(__dirname + "/ui"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/ui/index.html");
});

app.post("/watson", function(req, res) {
  console.log("Called /watson");
  var city = null;

  var firstvariable = "in ";
  var secondvariable = "";

  if (
    req.body.text.match(new RegExp(firstvariable + "(.*)" + secondvariable))
  ) {
    city = req.body.text.match(
      new RegExp(firstvariable + "(.*)" + secondvariable)
    )[1];
  }

  console.log(city);
  console.log("sessionid: ", sessionid);
  if (sessionid) {
    assistant.message(
      {
        assistant_id: assistantid,
        session_id: sessionid,
        context: {
          skills: {
            "main skill": {
              user_defined: {
                city: city
              }
            }
          }
        },
        input: {
          message_type: "text",
          text: req.body.text
        }
      },
      function(err, response) {
        if (response == null) {
          res.send("Connection timed out. ");
        } else {
          res.send(response.output.generic[0].text);
        }
      }
    );
  } else {
    assistant.createSession(
      {
        assistant_id: assistantid
      },
      function(err, response) {
        if (err) console.log("error:", err);

        sessionid = response.session_id;

        assistant.message(
          {
            assistant_id: "62e3f8df-3a8a-436b-93ca-1c648bbe5353",
            session_id: sessionid,
            context: {
              skills: {
                "main skill": {
                  user_defined: {
                    city: city
                  }
                }
              }
            },
            input: {
              message_type: "text",
              text: req.body.text
            }
          },
          function(err, response) {
            res.send(response.output.generic[0].text);
          }
        );
      }
    );
  }
});

app.use(
  responseTime((req, res, time) => {
    console.log(req.method, req.url, time + "ms");
  })
);

app.listen(process.env.PORT || 9001, function() {
  console.log("\nServer started on port 9001");
});
