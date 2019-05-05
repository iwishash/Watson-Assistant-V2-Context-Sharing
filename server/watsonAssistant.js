var watson = require("watson-developer-cloud");

var assistant = new watson.AssistantV2({
  version: "2018-11-08",
  username: "username",
  password: "password",
  url: "https://gateway.watsonplatform.net/assistant/api"
});

module.exports.assistant = assistant;
