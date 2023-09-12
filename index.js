const { ActivityType } = require('discord.js');
const Discord = require('discord.js');

const client = new Discord.Client({
  intents: ['GuildMessages', 'Guilds', 'DirectMessages', 'MessageContent'],
});

const prefix = '!';

const { token } = require('./config.json');

const userToDelete = '461966294128787478'; //andrew's id for trolling him
//const userToDelete = '502635104968114177'; //my id for testing

// Initialize the delete toggle to false, so that the message-deleting feature is initially turned off
let deleteToggle = false;



// Log a message to the terminal when the bot is ready to receive messages
client.on('ready', () => {
  console.log('Bot is online!');
  client.user.setActivity("for unauthorized messages", { type: ActivityType.Watching });
});

client.on('messageCreate', message => {
  if (message.content.startsWith(prefix) || message.author.bot) {
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();


    // Log a message to the terminal when a message is received
    console.log(`Received message: ${message.content}`);

    // Handle the toggle command
    if (command === 'toggle') {
      // Log a message to the terminal when the toggle command is received
      console.log('Received toggle command');
      // If the toggle is currently on, turn it off and send a message to confirm
      if (deleteToggle) {
        deleteToggle = false;
        console.log('Message-deleting feature turned off.');
        //message.channel.send('Delete mode disabled.');
      } else {
        // If the toggle is currently off, turn it on and send a message to confirm
        deleteToggle = true;
        console.log('Message-deleting feature turned on.');
        //message.channel.send('Delete mode enabled.');
      }
    }
  } else {

    // If the message was sent by the user that we want to delete messages from, and the delete toggle is on, delete the message
    if (message.author.id === userToDelete && deleteToggle) {
      // Log a message to the terminal when a message is deleted
      console.log(`Deleted message: ${message.content}`);

      message.delete();
      //message.channel.send("No talking for you.");
    }
  }
});


client.login(token);