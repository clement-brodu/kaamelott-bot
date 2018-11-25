//
// Copyright (c) 2017 Cisco Systems
// Licensed under the MIT License
//

//
// BotKit configuration
//

// Load environment variables from project .env file
require("node-env-file")(__dirname + "/.env");

// Fetch token from environement
// [COMPAT] supports SPARK_TOKEN for backward compatibility
const accessToken = process.env.ACCESS_TOKEN || process.env.SPARK_TOKEN;
if (!accessToken) {
  console.log(
    "Could not start as this bot requires a Webex Teams API access token."
  );
  console.log("Please invoke with an ACCESS_TOKEN environment variable");
  console.log("Example:");
  console.log(
    "> ACCESS_TOKEN=XXXXXXXXXXXX PUBLIC_URL=YYYYYYYYYYYYY node bot.js"
  );
  process.exit(1);
}

// Get public URL where the Webex cloud platform will post notifications (webhook registration)
let publicUrl = process.env.PUBLIC_URL;
// Infer the app domain for popular Cloud PaaS
if (!publicUrl) {
  // Heroku hosting: available if dyno metadata are enabled, https://devcenter.heroku.com/articles/dyno-metadata
  if (process.env.HEROKU_APP_NAME) {
    publicUrl = "https://" + process.env.HEROKU_APP_NAME + ".herokuapp.com";
  }

  // Glitch hosting
  if (process.env.PROJECT_DOMAIN) {
    publicUrl = "https://" + process.env.PROJECT_DOMAIN + ".glitch.me";
  }
}
if (!publicUrl) {
  console.log("Could not start as this bot must expose a public endpoint.");
  console.log(
    "Please add env variable PUBLIC_URL on the command line or to the .env file"
  );
  console.log("Example: ");
  console.log(
    "> ACCESS_TOKEN=XXXXXXXXXXXX PUBLIC_URL=YYYYYYYYYYYYY node bot.js"
  );
  process.exit(1);
}

//
// Create bot
//

const Botkit = require("botkit");

const env = process.env.NODE_ENV || "development";
const controller = Botkit.sparkbot({
  log: true,
  public_address: publicUrl,
  ciscospark_access_token: accessToken,
  // this is a RECOMMENDED security setting that
  // checks if incoming payloads originate from Webex
  secret: process.env.SECRET,
  webhook_name: process.env.WEBHOOK_NAME || "built with BotKit (" + env + ")"
});

const bot = controller.spawn({});

//
// Launch bot
//

const port = process.env.PORT || 3000;
controller.setupWebserver(port, function(err, webserver) {
  controller.createWebhookEndpoints(webserver, bot, function() {
    console.log("webhooks setup completed!");
  });

  // installing Healthcheck
  const healthcheck = {
    up_since: new Date(Date.now()).toGMTString(),
    hostname: require("os").hostname() + ":" + port,
    version: "v" + require("./package.json").version,
    bot: "unknown", // loaded asynchronously
    botkit: "v" + bot.botkit.version()
  };
  webserver.get(process.env.HEALTHCHECK_ROUTE, function(req, res) {
    // As the identity is load asynchronously from the
    // Webex Teams access token, we need to check until it's fetched
    if (healthcheck.bot == "unknown") {
      /* eslint-disable no-unused-vars */
      const identity = bot.botkit.identity;
      /* eslint-enable no-unused-vars */
      if (bot.botkit.identity) {
        healthcheck.bot = bot.botkit.identity.emails[0];
      }
    }

    res.json(healthcheck);
  });
  console.log("healthcheck available at: " + process.env.HEALTHCHECK_ROUTE);
});

//
// Load skills
//

const normalizedPath = require("path").join(__dirname, "skills");
require("fs")
  .readdirSync(normalizedPath)
  .forEach(function(file) {
    try {
      require("./skills/" + file)(controller, bot);
      console.log("loaded skill: " + file);
    } catch (err) {
      if (err.code == "MODULE_NOT_FOUND") {
        if (file != "utils") {
          console.log("could not load skill: " + file);
        }
      }
    }
  });

//
// Webex Teams Utilities
//

// Utility to add mentions if Bot is in a 'Group' space
bot.appendMention = function(message, command) {
  let botName;

  // if the message is a raw message
  // (from a post message callback such as bot.say())
  if (message.roomType && message.roomType == "group") {
    botName = bot.botkit.identity.displayName;
    return "`@" + botName + " " + command + "`";
  }

  // if the message is a Botkit message
  if (message.raw_message && message.raw_message.data.roomType == "group") {
    botName = bot.botkit.identity.displayName;
    return "`@" + botName + " " + command + "`";
  }

  return "`" + command + "`";
};

// [COMPAT] Adding this function to ease interoperability
// with the skills part of the Botkit samples project
bot.enrichCommand = bot.appendMention;

// Autoping for heroku
const https = require("https");
if (process.env.HEROKU_AUTOPING == "true") {
  setInterval(function() {
    https.get(publicUrl);
  }, 1200000); // every 20 minutes (1200000)
}
