'use strict';

const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '447133612:AAG96SqODQfDB9sXv9YB9GLdWEg15BxekPQ';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

const menuOptions = {
  menuConfirm:{
    Si:'✅ Sí',
    No: '❌ No',
    OtroDia: '📅 Otro día'
  }
};

bot.onText(/^\/start$/, (msg, match) => {

  let messageOptions = {
    parse_mode:'HTML'
  };

  bot.sendMessage(msg.chat.id, `Hola <b>${msg.from.first_name}</b>, ingresa el comando '/menu'`, messageOptions);

});

bot.onText(/^\/menu$/, (msg, match) => {

  const chatId = msg.chat.id;
  const resp = match[1];

  let messageOptions = {    
    reply_markup: {
      resize_keyboard: true,
      one_time_keyboard: true,
      keyboard: [
        [menuOptions.menuConfirm.Si],
        [menuOptions.menuConfirm.No, menuOptions.menuConfirm.OtroDia]
      ],
    },
  };

  bot.sendMessage(chatId, 'Selecciona una opción', messageOptions);
  
});

/**
 * List for every entered message
 */
bot.on('message', (msg) => {

  const chatId = msg.chat.id;

  if (!msg.text) {
    return;
  }    

  if (msg.text.indexOf(menuOptions.menuConfirm.Si) === 0) {
    bot.sendMessage(msg.chat.id, "Has dicho ✅ Sí.");
  } else if (msg.text.indexOf(menuOptions.menuConfirm.No) === 0) {
    bot.sendMessage(msg.chat.id, "Has dicho ❌ No.");
  } if (msg.text.indexOf(menuOptions.menuConfirm.OtroDia) === 0) {
    bot.sendMessage(msg.chat.id, "Has dicho 📅 Otro día.");
  }

});