'use strict'

const Telegram = require('telegram-node-bot');
const TextCommand = Telegram.TextCommand;
const tg = new Telegram.Telegram('385393003:AAFsOYmCKEnvUfPuWWoOYGCSjUMpxep0__4', {
  webAdmin: {
    port: process.env.PORT || 5000
  }
});

class PingController extends Telegram.TelegramBaseController {

  /**
   * @param {Scope} $
   */
  pingHandler($) {
    $.sendMessage('pong');
  }

  getNumericValueFromCommand(comandValue) {
    return comandValue.split(' ').slice(1).join(' ')
  }

  n1Handler($) {
    console.log('/n1: ' + $.message.text);
    $.setUserSession('n1', this.getNumericValueFromCommand($.message.text));
    $.sendMessage('Muy bien, ahora ingresa el numero 2');
  }

  n2Handler($) {
    console.log('/n2: ' + $.message.text);
    $.setUserSession('n2', this.getNumericValueFromCommand($.message.text));
    $.sendMessage('Muy bien, ahora ingresa el comando "result"');
  }

  resultHandler($) {
    $.getUserSession('n1').then(n1 => {
      $.getUserSession('n2').then(n2 => {
        const result = parseInt(n1) + parseInt(n2);
        console.log("La suma es: " + result);
        $.sendMessage("La suma es: " + result);
      });
    });
  }

  get routes() {
    return {
      'pingCommand': 'pingHandler',
      'n1Command': 'n1Handler',
      'n2Command': 'n2Handler',
      'resultCommand': 'resultHandler'
    }
  }
}

tg.router
  .when(
  new TextCommand('/ping', 'pingCommand'),
  new PingController()
  )
  .when(
  new TextCommand('/n1', 'n1Command'),
  new PingController()
  )
  .when(
  new TextCommand('/n2', 'n2Command'),
  new PingController()
  )
  .when(
  new TextCommand('/result', 'resultCommand'),
  new PingController()
  )