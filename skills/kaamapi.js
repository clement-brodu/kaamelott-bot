//
// Command: kaamapi
//

module.exports = function(controller) {
  const KAAMAPI_URL = "http://kaamebot.rockball.fr/api/";
  let apiList = [];
  apiList.push({
    keywords: [/^kakapi$/, /^[kK]aka$/],
    adresse: "kaka",
    help: "Api Caca"
  });
  apiList.push({
    keywords: [/^totoapi$/, /^[tT]oto$/],
    adresse: "toto",
    help: "Api Toto"
  });

  apiList.forEach(function(kaamapi) {
    controller.hears(
      kaamapi.keywords,
      "direct_message,direct_mention",
      function(bot, message) {
        let url = KAAMAPI_URL.concat(kaamapi.adresse);

        let text = "url: " + url;
        text += "\n\n" + kaamapi.help;
        bot.reply(message, text);
      }
    );
  });
};
