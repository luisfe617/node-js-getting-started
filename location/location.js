'use strict';

const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '385393003:AAFsOYmCKEnvUfPuWWoOYGCSjUMpxep0__4';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

bot.onText(/^\/start$/, (msg, match) => {

    let messageOptions = {
        parse_mode: 'HTML'
    };

    bot.sendMessage(msg.chat.id,
        `
        Bienvenido <b>${msg.from.first_name}</b>, \n 
        \n
        <b>Comandos</b>
        /getLocation
        `, messageOptions);
});

/**
 * List for every entered message
 */
bot.onText(/^\/getLocation$/, (msg) => {

    const chatId = msg.chat.id;

    bot.sendLocation(chatId, 44.97108, -104.27719);
    bot.sendMessage(chatId, msg);
});