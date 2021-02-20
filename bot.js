//Require Bot Dependencies
const Discord = require("discord.js");
global.Client = new Discord.Client();

if (process.env.NODE_ENV == 'production') {
    Client.login(process.env.BOT_TOKEN);
} else if (process.env.NODE_ENV == 'staging') {
    Client.login(process.env.MAINTENANCE_TOKEN);
}

global.ourUsers = require('./json_files/users.json');
global.ourChannels = require('./json_files/channels.json');

//Require observer classes
const App = require("./app")
const messages = new App.Messages();
global.database = new App.Database();

Client.on("ready", () => {
    database.initializeTables();
    console.log("I am ready!");
});

Client.once('reconnecting', () => {
    console.log('Reconnecting!');
});

Client.once('disconnect', () => {
    console.log('Disconnect!');
});

Client.on("message", async message => {
    messages.newMessage(message);
});
