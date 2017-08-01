
'use strict';

const TOKEN = process.env.TELEGRAM_TOKEN || '385393003:AAFsOYmCKEnvUfPuWWoOYGCSjUMpxep0__4';
const TelegramBot = require('node-telegram-bot-api');
const options = {
  webHook: {
    // Port to which you should bind is assigned to $PORT variable
    // See: https://devcenter.heroku.com/articles/dynos#local-environment-variables
    port: process.env.PORT || 5000
    // you do NOT need to set up certificates since Heroku provides
    // the SSL certs already (https://<app-name>.herokuapp.com)
    // Also no need to pass IP because on Heroku you need to bind to 0.0.0.0
  }
};
// Heroku routes from port :443 to $PORT
// Add URL of your app to env variable or enable Dyno Metadata
// to get this automatically
// See: https://devcenter.heroku.com/articles/dyno-metadata
const url = process.env.APP_URL || 'https://limitless-cove-35209.herokuapp.com/';
const bot = new TelegramBot(TOKEN, options);

// This informs the Telegram servers of the new webhook.
// Note: we do not need to pass in the cert, as it already provided
bot.setWebHook(`${url}/bot${TOKEN}`);

const inlineOptions = {
  inlineQueries: {
    GetPictures: 'CM_GETQUERIES'
  }
};

bot.onText(/^\/start$/, (msg, match) => {

  let messageOptions = {
    parse_mode: 'HTML'
  };

  bot.sendMessage(msg.chat.id, `Bienvenido <b>${msg.from.first_name}</b>`, messageOptions);
});

bot.on('message', (msg) => {
    var location = "location";
    if (msg.text.indexOf(location) === 0) {
        bot.sendLocation(msg.chat.id,44.97108, -104.27719);
        bot.sendMessage(msg.chat.id, "Here is the point");
    }
});

/*
bot.onText(/^\/menu$/, (msg, match) => {

  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "¿Qué quieres hacer?", { //sendMessage: https://core.telegram.org/bots/api
    reply_markup: {
      inline_keyboard: [ //InlineKeyboardMarkup: https://core.telegram.org/bots/api#inlinekeyboardmarkup
        [
          { //InlineKeyboardButton: https://core.telegram.org/bots/api#inlinekeyboardbutton
            text: 'Enviar a contacto',
            switch_inline_query: ''
          },
          { //InlineKeyboardButton: https://core.telegram.org/bots/api#inlinekeyboardbutton
            text: '+ Get pictures',
            switch_inline_query_current_chat: ''
          },
          { //InlineKeyboardButton: https://core.telegram.org/bots/api#inlinekeyboardbutton
            text: '+ Acción sencilla',
            callback_data: inlineOptions.inlineQueries.GetPictures
          }
        ]
      ],
    },
  }).then(function (data) {
    console.log('message sent ');
  }).catch(console.error);

});

bot.on('message', (msg) => {

  const chatId = msg.chat.id;

  console.log('message received');
});

bot.on('callback_query', (msg) => {
  console.log('callback_query received');
  if (msg.data == inlineOptions.inlineQueries.GetPictures) {
    bot.answerCallbackQuery(msg.id, 'acción sencilla pressed', true);
  }
});

bot.on('inline_query', (msg) => {
  console.log('inline_query received');
  console.log(JSON.stringify(msg));
  bot.answerInlineQuery(msg.id, //https://core.telegram.org/bots/api#answerinlinequery
    [ //https://unnikked.ga/understanding-telegram-inline-bots-73ac9aeea643
      { //https://core.telegram.org/bots/api#inlinequeryresultarticle
        id: '1',
        type: 'article',
        title: 'Opción 1..',
        input_message_content: {
          message_text: 'contenido de opción 1'
        }
      },
      {
        id: '2',
        type: 'article',
        title: 'Opción 2..',
        message_text: 'tow text',
        input_message_content: {
          message_text: 'contenido de opción 2'
        }
      }
    ], {
      cache_time:'10'
    });
});

bot.on('chosen_inline_result', (msg) => {
  console.log('chosen_inline_result');
  console.log(JSON.stringify(msg));
  bot.sendMessage(msg.from.id, `result selected id: ` + msg.result_id);
});
*/