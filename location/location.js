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
        /sendContact
        `, messageOptions);
});

/**
 * List for every entered message
 */
bot.onText(/^\/sendContact$/, (msg) => {

    const chatId = msg.chat.id;

    bot.sendMessage(chatId, "<b>¿Qué quieres hacer?</b>", { //sendMessage: https://core.telegram.org/bots/api#sendmessage
        parse_mode: 'HTML',
        reply_markup: {
            keyboard: [ //replykeyboardmarkup: https://core.telegram.org/bots/api#replykeyboardmarkup
                [
                    { //KeyboardButton: https://core.telegram.org/bots/api#keyboardbutton
                        text: 'Enviar contacto',
                        request_contact: true
                    },
                    { //KeyboardButton: https://core.telegram.org/bots/api#keyboardbutton
                        text: 'Enviar ubicación',
                        request_location: true
                    }
                ]
            ],
        },
    }).then(function (data) {
        console.log('message sent');
        console.log(JSON.stringify(data));
    }).catch(console.error);

});


bot.on('contact', (msg) => {

    const chatId = msg.chat.id;

    console.log('contact received');
    console.log(JSON.stringify(msg));
});

bot.on('location', (msg) => {

    const chatId = msg.chat.id;

    console.log('location received');
    console.log(JSON.stringify(msg));
});