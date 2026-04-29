const TelegramBot = require('node-telegram-bot-api');

const token = '8688855452:AAH_iCHt59UJxPGfJXduUMgi9VzuWqCrdwo'; // replace with your token
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "Play the game:", {
    reply_markup: {
      inline_keyboard: [[
        {
          text: "Play",
          web_app: {
            url: "https://billionairehere.in"
          }
        }
      ]]
    }
  });
});