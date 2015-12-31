# slack-tonkkubot
A bot in node.js for monstercat family hub slack team
This is the source code for tonkkubot. If you're not in mfh's slack, you shouldn't be here :P

## Requirements
This bot needs 2 APIs. Don't ask why. It's because the "secAPI" was harder to use for getting data, but I still liked the sending messages in that one better. The other api is for getting the data.

* [slackbots](https://github.com/mishk0/slack-bot-api)
* [slackbotapi](https://github.com/xBytez/slackbotapi)
* request
* express, maybe. idk but it's on my folder. I might not use it anymore after I tried something stupid.

```
npm install slackbots
npm install slackbotapi
npm install request
(npm install express)
```

There's also an addition to slackbotapi in this repo.

## Functionality
It works, believe me.

### Commands
* `!ping` - Pong!
* `!hi` - The bot is polite, he will say hello back to you :)
* `!say [message]` - It makes the bot say whatever you just told it to say! How useful!
* `!podcast` -  Counts down to the podcast and gives links to the stream.
* `!topic <set> {new_topic}` - Says what the channel's topic is or set a new one.
* `!purpose <set> {new_purpose}` - Same as the topic but less useful
* `!nr (or !nextrelease)` - Tells you what the next release is (http://tonkku107.esy.es/tonkkubot/nextrelease)
* `!welcome` - Welcomes the person in the team, if the bot was dead when they joined.

Legend:    
[] = Required    
<> = Optional    
{} = Semi-optional - Depends on what you did in your past

### Events
Events are nice    
    
When someone joins the team, they will be welcomed and told to dm @ry and fill a form. Yay!

## Other stuff
Well, you are free to use this code, I don't care.    
You might want to look at the podcast code and change the time stuff.    
Can I go now?
