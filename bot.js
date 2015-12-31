var slackAPI = require('slackbotapi');
var secAPI = require('slackbots');
var bot = new slackAPI({
	'token': 'insert_token_here',
	'logging': true,
	'autoReconnect': false
});
var oBot = new secAPI({
	token: 'and_here',
    name: 'tonkkubot'
});
var params = {
        icon_emoji: ':mcat:'
    };

var deSplit = function(cmd){
	if (typeof cmd[2] != 'undefined'){
			for(var i = 2; i < cmd.length; i++){
				cmd[1] = cmd[1] + ' ' + cmd[i];
			}
		}
	return cmd;
}

bot.on('message', function(data){
	if (typeof data.text == 'undefined') return;
	if(data.text.charAt(0) === '!'){
		var command = data.text.substring(1).split(' ');

		switch(command[0].toLowerCase()){
			case 'ping':
				oBot.postMessage(data.channel, 'Pong!', params);
				break;
			case 'hi':
				oBot.postMessage(data.channel, 'Hello, '+bot.getUser(data.user).name+'!', params);
				break;
			case 'say':
				var command = deSplit(command);
				oBot.postMessage(data.channel, command[1], params);
				break;
			case 'purpose':
				if (command[1] == "set"){
					command.splice(0,1);
					command = deSplit(command);
					oBot._api('channels.setPurpose',{channel: data.channel, purpose: command[1]});
					oBot._api('groups.setPurpose',{channel: data.channel, purpose: command[1]});
				}else{
					var chtype, chinfo, purpose;
					var chtype = "channel";
					var chinfo = bot.getChannel(data.channel);
					if (chinfo == null){
						var chinfo = bot.getGroup(data.channel);
						var chtype = "group";
					}
					if(chinfo == null) break;
					var purpose = chinfo.purpose.value;
					var creator = chinfo.purpose.creator;
					var lastset = chinfo.purpose.last_set;
					var time = new Date(lastset*1000);
					var time = time.toUTCString();
					if (purpose == ''){
						oBot.postMessage(data.channel, 'This '+chtype+' has no purpose.', params);
					}else{
						oBot.postMessage(data.channel, 'The purpose of this '+chtype+' is: "'+purpose+'" and was set by '+bot.getUser(creator).name+' at '+time+'.', params);
					}
				}
				break;
			case 'topic':
				if (command[1] == "set"){
					command.splice(0,1);
					command = deSplit(command);
					oBot._api('channels.setTopic',{channel: data.channel, topic: command[1]});
					oBot._api('groups.setTopic',{channel: data.channel, topic: command[1]});
				}else{
					var chtype, chinfo, topic;
					var chtype = "channel";
					var chinfo = bot.getChannel(data.channel);
					if (chinfo == null){
						var chinfo = bot.getGroup(data.channel);
						var chtype = "group";
					}
					if(chinfo == null) break;
					var topic = chinfo.topic.value;
					var creator = chinfo.topic.creator;
					var lastset = chinfo.topic.last_set;
					var time = new Date(lastset*1000);
					var time = time.toUTCString();
					if (topic == ''){
						oBot.postMessage(data.channel, 'This '+chtype+' has no topic.', params);
					}else{
						oBot.postMessage(data.channel, 'The topic of this '+chtype+' is: "'+topic+'" and was set by '+bot.getUser(creator).name+' at '+time+'.', params);
					}
				}
				break;
			case "podcast":
				function nextEvent(){
					var today = new Date();
					/*
					today.setDate(21);
					today.setMonth(9);
					today.setHours(15);
					*/
					console.log('today: '+today);
					if(today.getDay() == 2 && today.getHours() < 17){
						month = String(today.getMonth() + 1);
						if(month.length == 1){
							String(month = "0"+month);
						}
						day = String(today.getDate());
						if(day.length == 1){
							String(day = "0"+day);
						}
						return today.getFullYear() + '-' + month + '-' + day; 
					}else{
						do {
							today.setDate(today.getDate()+1);
						}while(today.getDay() != 2);
						month = String(today.getMonth() +1);
						if(month.length == 1){
							month = String("0"+month);
						}
						day = String(today.getDate());
						if(day.length == 1){
							String(day = "0"+day);
						}
						return today.getFullYear() + '-' + month + '-' + day;
					}
				}
				console.log('Next Event: '+nextEvent());

				function getTimeRemaining(endtime){
				  var t = Date.parse(endtime) - Date.parse(new Date());
				  var seconds = Math.floor( (t/1000) % 60 );
				  var minutes = Math.floor( (t/1000/60) % 60 );
				  var hours = Math.floor( (t/(1000*60*60)) % 24 );
				  var days = Math.floor( t/(1000*60*60*24) );
				  return {
				    'total': t,
				    'days': days,
				    'hours': hours,
				    'minutes': minutes,
				    'seconds': seconds
				  };
				}

				var now = new Date();
				/*
				now.setDate(21);
				now.setHours(15);
				now.setMonth(9);
				*/
				console.log('now: ' + now);
				var startTime = new Date(nextEvent()+'T13:00:00-0800');
				var endTime = new Date(nextEvent()+'T14:00:00-0800');
				console.log("start: " + startTime + " end: " + endTime);
				if(now > startTime && now < endTime){
					oBot.postMessage(data.channel, 'Monstercat Podcast at 1PM PST / 4PM EST / 9PM GMT each and every tuesday\nThe podcast is LIVE!!!\nhttp://live.monstercat.com\nhttp://twitch.tv/monstercat', params);
				}else{
					event = nextEvent() + 'T13:00:00-0800';
					podcast = getTimeRemaining(event);
					countdown = podcast.days + " day(s) " + podcast.hours + " hour(s) " + podcast.minutes + " minute(s) " + podcast.seconds + " second(s)";
					oBot.postMessage(data.channel, "Monstercat Podcast at 1PM PST / 4PM EST / 9PM GMT each and every tuesday\nCountdown: " +countdown+ "\nhttp://live.monstercat.com\nhttp://twitch.tv/monstercat",params);
				}
				break;
			case "nextrelease":
			case "nr":
				if (data.channel == "C052G3NRF" || data.channel == "G0CBGCUDQ" || data.channel == "C0CBB8VNG"){
				var request = require('request');
				request.get('http://tonkku107.esy.es/tonkkubot/nextrelease/nr.json', function (error, response, body) {
    				if (!error && response.statusCode == 200) {
        				var json = body;
        				console.log(json);
        				json = JSON.parse(json);
        				if(json.image == 1){
        					oBot.postMessage(data.channel, "Next Release: "+json.artist+" - "+json.title+"\n"+json.imgsrc, params);
        				}else{
        					oBot.postMessage(data.channel, "Next Release: "+json.artist+" - "+json.title, params);
        				}	
    				}
				});
				}else{
					oBot.postMessage(data.channel, "You can only do this command in <#C052G3NRF>", params);
				}
				break;
			case "welcome":
				if(command[1] != null){
					oBot.postMessage('C0493QJEJ', 'Hello and welcome to the team, '+command[1]+'! :simple_smile:\nPlease dm <@U0493QJEC> and fill this form: http://goo.gl/forms/w51NT8BDCw', params);
				}else{
					oBot.postMessage(data.channel, "Missing argument: user", params);
				}
				break;
            case "help":
                oBot.postMessage(data.channel, "You need help using the bot? Okay:\n!help - Helps you with the bot, like this message right here\n!ping - Pong!\n!hi - The bot is polite, he will say hello back to you :)\n!say [message] - It makes the bot say whatever you just told it to say! How useful!\n!podcast - Counts down to the podcast and gives links to the stream.\n!topic <set> {new_topic} - Says what the channel's topic is or set a new one.\n!purpose <set> {new_purpose} - Same as the topic but less useful.\n!nr (or !nextrelease) - Tells you what the next release is. (http://tonkku107.esy.es/tonkkubot/nextrelease)\n\nLegend:\n[] = Required\n<> = Optional\n{} = Almost Optional",params);
                break;
		}
	}
});

bot.on('team_join', function (data) {
    oBot.postMessage('C0493QJEJ', 'Hello and welcome to the team, <@'+data.user.id+'>! :simple_smile:\nPlease dm <@U0493QJEC> and fill this form: http://goo.gl/forms/w51NT8BDCw', params);
});