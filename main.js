//all package
const Discord = require('discord.js');
const client = new Discord.Client({ disableEveryone: true});
const bot = new Discord.Client();
const fs = require('fs');
const r1 = require('snekfetch');
client.on('warn', console.warn);
client.on('error', console.error);
const GUILDID = ' ; //   
const CHANNELID = ''; // 

//prefix
const prefix = " -"; // 

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
client.on("ready", () => {
  client.user.setStatus("Online");
});
client.on('ready', () => {
    client.user.setActivity(`Type ${prefix}help`,{ type: 'WATCHING' });
})


//
const developers = [" ","","",""] ///
client.on('message', message => {

    let argresult = message.content.split(` `).slice(1).join(' ');
    if (message.content.startsWith(prefix + 'setStreaming')) {
      if (!developers.includes(message.author.id)) return;
      message.delete();
      client.user.setGame(argresult, 'https://twitch.tv/0sama18');

    } else if(message.content.startsWith(prefix + 'setWatching')) {
        client.user.setActivity(argresult,{type: 'WATCHING'});

      } else if(message.content.startsWith(prefix + 'setListening')) {
        client.user.setActivity(argresult,{type: 'LISTENING'});

      } else if(message.content.startsWith(prefix + 'setPlaying')) {
        client.user.setActivity(argresult,{type: 'PLAYING'});

      } else if(message.content.startsWith(prefix + 'setName')) {
        client.user.setUsername(argresult);

      } else if(message.content.startsWith(prefix + 'setAvatar')) {
        client.user.setAvatar(argresult);


      } else if(message.content.startsWith(prefix + 'setStatus')) {
        if(!argresult) return message.channel.send('`online`, `DND(Do not Distrub),` `idle`, `invisible(Offline)` :notes: أختر أحد الحالات');
        client.user.setStatus(argresult);


    }

  });


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

///
let cmds = {
  play: { cmd: 'play', a: 
  skip: { cmd: 'skip', a: 
  stop: { cmd: 'stop', a: 
  pause: { cmd: 'pause', a: 
  resume: { cmd: 'resume', a:
  volume: { cmd: 'volume', a: 
  queue: { cmd: 'queue', a: 
  repeat: { cmd: 'repeat', a: 
  forceskip: { cmd: 'forceskip', a: 
  skipto: { cmd: 'skipto', a: 
  nowplaying: { cmd: 'Nowplaying', a: 
};

client.on('ready',async () => {
  setInterval(() => {
client.channels.find(ch => ch.id === CHANNELID && ch.type === 'voice').join();
},1000); 
 voiceStay(GUILDID, CHANNELID);
  function voiceStay(guildid, channelid) {
    if(!guildid) throw new Error('Syntax: voiceStay function requires guildid');
    if(!channelid) throw new Error('Syntax: voiceStay function requires channelid');

    let guild = client.guilds.get(guildid);
    let channel = guild.channels.get(channelid);

    if(channel.type === 'voice') {
      channel.join().catch(e => {
        console.log(`Failed To Join :: ${e.message}`);
      });
    } else {
      console.log(`Channel Type ::  ${channel.type}, It must be Voice.`);
    }
  }
});


Object.keys(cmds).forEach(key => {
var value = cmds[key];
  var command = value.cmd;
  client.commands.set(command, command);

  if(value.a) {
    value.a.forEach(alias => {
    client.aliases.set(alias, command)
  })
  }
})

const ytdl = require('ytdl-core');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube(""); 

let active = new Map();

client.on('warn', console.warn);

client.on('error', console.error);

client.on('ready', () => {
    console.log(`on`);
    console.log(`Guilds: ${client.guilds.size}`);
    console.log(`Users: ${client.users.size}`);
});

client.on('message', async msg => {
    if(msg.author.bot) return undefined;
  if(!msg.content.startsWith(prefix)) return undefined;

  const args = msg.content.slice(prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();

    const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';

    let cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))

    let s;

    if(cmd === 'play') {
        const voiceChannel = msg.member.voiceChannel;
        if(!voiceChannel) return msg.channel.send(`:no_entry_sign: You must be listening in a voice channel to use that!`);
        const permissions = voiceChannel.permissionsFor(msg.client.user);
        if(!permissions.has('CONNECT')) {
            return msg.channel.send(`:no_entry_sign: I can't join Your voiceChannel because i don't have ` + '`' + '`CONNECT`' + '`' + ` permission!`);
        }

        if(!permissions.has('SPEAK')) {
            return msg.channel.send(`:no_entry_sign: I can't SPEAK in your voiceChannel because i don't have ` + '`' + '`SPEAK`' + '`' + ` permission!`);
        }

        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();

			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}
			return msg.channel.send(`Added to queue: ${playlist.title}`);
		} else {
			try {

				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(args, 1);

					// eslint-disable-next-line max-depth
					var video = await youtube.getVideoByID(videos[0].id);
				} catch (err) {
					console.error(err);
					return msg.channel.send('I can\'t find any thing');
				}
			}

			return handleVideo(video, msg, voiceChannel);
		}

        async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const serverQueue = active.get(msg.guild.id);


//	console.log('yao: ' + Util.escapeMarkdown(video.thumbnailUrl));

let hrs = video.duration.hours > 0 ? (video.duration.hours > 9 ? `${video.duration.hours}:` : `0${video.duration.hours}:`) : '';
let min = video.duration.minutes > 9 ? `${video.duration.minutes}:` : `0${video.duration.minutes}:`;
let sec = video.duration.seconds > 9 ? `${video.duration.seconds}` : `0${video.duration.seconds}`;
let dur = `${hrs}${min}${sec}`

  let ms = video.durationSeconds * 1000;

	const song = {
		id: video.id,
		title: video.title,
    duration: dur,
    msDur: ms,
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 50,
      requester: msg.author,
			playing: true,
      repeating: false
		};
		active.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			active.delete(msg.guild.id);
			return msg.channel.send(`I cant join this voice channel`);
		}
	} else {
		serverQueue.songs.push(song);

		if (playlist) return undefined;
		if(!args) return msg.channel.send('no results.');
		else return msg.channel.send(':watch: Loading... [`' + args + '`]').then(m => {
      setTimeout(() => {//:watch: Loading... [let]
        m.edit(`:notes: Added **${song.title}**` + '(` ' + song.duration + ')`' + ` to the queue at position ` + `${serverQueue.songs.length}`);
      }, 500)
    }) 
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = active.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		active.delete(guild.id);
		return;
	}
	//console.log(serverQueue.songs);
  if(serverQueue.repeating) {
	console.log('Repeating');
  } else {
	serverQueue.textChannel.send(':notes: Added **' + song.title + '** (`' + song.duration + '`) to begin playing.');
}
	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			//if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			//else console.log(reason);
      if(serverQueue.repeating) return play(guild, serverQueue.songs[0])
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 100);


}
} else if(cmd === 'stop') {
        if(msg.guild.me.voiceChannel !== msg.member.voiceChannel) return msg.channel.send(`You must be in ${msg.guild.me.voiceChannel.name}`)
        if(!msg.member.hasPermission('ADMINISTRATOR')) {
          msg.react('❌')
          return msg.channel.send('You don\'t have permission `ADMINSTRATOR`');
        }
        let queue = active.get(msg.guild.id);
        if(queue.repeating) return msg.channel.send('Repeating Mode is on, you can\'t stop the music, run `' + `${prefix}repeat` + '` to turn off it.')
        queue.songs = [];
        queue.connection.dispatcher.end();
        return msg.channel.send(':notes: The player has stopped and the queue has been cleared.');

    } else if(cmd === 'skip') {

      let vCh = msg.member.voiceChannel;

      let queue = active.get(msg.guild.id);

        if(!vCh) return msg.channel.send('Sorry, but you can\'t because you are not in voice channel');

        if(!queue) return msg.channel.send('No music playing to skip it');

        if(queue.repeating) return msg.channel.send('You can\'t skip it, because repeating mode is on, run ' + `\`${prefix}forceskip\``);

        let req = vCh.members.size - 1;

        if(req == 1) {
            msg.channel.send('**:notes: Skipped **' + args);
            return queue.connection.dispatcher.end('Skipping ..')
        }

        if(!queue.votes) queue.votes = [];

        if(queue.votes.includes(msg.member.id)) return msg.say(`You already voted for skip! ${queue.votes.length}/${req}`);

        queue.votes.push(msg.member.id);

        if(queue.votes.length >= req) {
            msg.channel.send('**:notes: Skipped **' + args);

            delete queue.votes;

            return queue.connection.dispatcher.end('Skipping ..')
        }

        msg.channel.send(`**You have successfully voted for skip! ${queue.votes.length}/${req}**`)

    } else if(cmd === 'pause') {

      let queue = active.get(msg.guild.id);

        let vCh = msg.member.voiceChannel;

        if(!vCh || vCh !== msg.guild.me.voiceChannel) return msg.channel.send(`You are not in my voice channel.`);

        if(!queue) {
            return msg.channel.send('No music playing to pause.')
        }

        if(!queue.playing) return msg.channel.send(':no_entry_sign: There must be music playing to use that!')

        let disp = queue.connection.dispatcher;

        disp.pause('Pausing..')

        queue.playing = false;

        msg.channel.send(':notes: Paused ' + args + '. **Type** `' + prefix + 'resume` to unpause!')

    } else if (cmd === 'resume') {

      let queue = active.get(msg.guild.id);

        let vCh = msg.member.voiceChannel;

        if(!vCh || vCh !== msg.guild.me.voiceChannel) return msg.channel.send(`You are not in my voice channel.`);

        if(!queue) return msg.channel.send(':notes: No music paused to resume.')

        if(queue.playing) return msg.channel.send(':notes: No music paused to resume.')

        let disp = queue.connection.dispatcher;

        disp.resume('Resuming..')

        queue.playing = true;

        msg.channel.send(':notes: Resumed.')

    } else if(cmd === 'volume') {

      let queue = active.get(msg.guild.id);

      if(!queue || !queue.songs) return msg.channel.send(':notes: There is no music playing to set volume.');

      let vCh = msg.member.voiceChannel;

      if(!vCh || vCh !== msg.guild.me.voiceChannel) return msg.channel.send(':notes: You are not in my voice channel');

      let disp = queue.connection.dispatcher;

      if(isNaN(args[0])) return msg.channel.send(':notes: Numbers only!');
      
      if(parseInt(args[0]) > 100) return msg.channel.send('You can\'t set the volume more than **100**.')
//:speaker: Volume changed from 20 to 20 ! The volume has been changed from ${queue.volume} to ${args[0]}
      msg.channel.send(':loud_sound: Volume has been **changed** from (`' + queue.volume + '`) to (`' + args[0] + '`)');

      queue.volume = args[0];

      disp.setVolumeLogarithmic(queue.volume / 100);

    } else if (cmd === 'queue') {

      let queue = active.get(msg.guild.id);

      if(!queue) return msg.channel.send(':no_entry_sign: There must be music playing to use that!');

      let embed = new Discord.RichEmbed()
      .setAuthor(`${client.user.username}`, client.user.displayAvatarURL)
      let text = '';

      for (var i = 0; i < queue.songs.length; i++) {
        let num;
        if((i) > 8) {
          let st = `${i+1}`
        } else {
      }
        text += `${num} ${queue.songs[i].title} [${queue.songs[i].duration}]\n`
      }
      embed.setDescription(`Songs Queue | ${msg.guild.name}\n\n ${text}`)
      msg.channel.send(embed)

    } else if(cmd === 'repeat') {

      let vCh = msg.member.voiceChannel;

      if(!vCh || vCh !== msg.guild.me.voiceChannel) return msg.channel.send('You are not in my voice channel');

      let queue = active.get(msg.guild.id);

      if(!queue || !queue.songs) return msg.channel.send('There is no music playing to repeat it.');

      if(queue.repeating) {
        queue.repeating = false;
        return msg.channel.send(':arrows_counterclockwise: **Repeating Mode** (`False`)');
      } else {
        queue.repeating = true;
        return msg.channel.send(':arrows_counterclockwise: **Repeating Mode** (`True`)');
      }

    } else if(cmd === 'forceskip') {

      let vCh = msg.member.voiceChannel;

      if(!vCh || vCh !== msg.guild.me.voiceChannel) return msg.channel.send('You are not in my voice channel');

      let queue = active.get(msg.guild.id);

      if(queue.repeating) {

        queue.repeating = false;

        msg.channel.send('ForceSkipped, Repeating mode is on.')

        queue.connection.dispatcher.end('ForceSkipping..')

        queue.repeating = true;

      } else {

        queue.connection.dispatcher.end('ForceSkipping..')

        msg.channel.send('ForceSkipped.')

      }

     } else if(cmd === 'skipto') {

      let vCh = msg.member.voiceChannel;

      if(!vCh || vCh !== msg.guild.me.voiceChannel) return msg.channel.send('You are not in my voice channel');

      let queue = active.get(msg.guild.id);

      if(!queue.songs || queue.songs < 2) return msg.channel.send('There is no music to skip to.');

    if(queue.repeating) return msg.channel.send('You can\'t skip, because repeating mode is on, run ' + `\`${prefix}repeat\` to turn off.`);

      if(!args[0] || isNaN(args[0])) return msg.channel.send('Please input song number to skip to it, run ' + prefix + `queue` + ' to see songs numbers.');

      let sN = parseInt(args[0]) - 1;

      if(!queue.songs[sN]) return msg.channel.send('There is no song with this number.');

      let i = 1;

      msg.channel.send(`Skipped to: **${queue.songs[sN].title}[${queue.songs[sN].duration}]**`)

      while (i < sN) {
        i++;
        queue.songs.shift();
      }

      queue.connection.dispatcher.end('SkippingTo..')

    } else if(cmd === 'Nowplaying') {

      let q = active.get(msg.guild.id);

      let now = npMsg(q)

      msg.channel.send(now.mes, now.embed)
      .then(me => {
        setInterval(() => {
          let noww = npMsg(q)
          me.edit(noww.mes, noww.embed)
        }, 5000)
      })

      function npMsg(queue) {

        let m = !queue || !queue.songs[0] ? 'No music playing.' : "Now Playing..."

      const eb = new Discord.RichEmbed();

      eb.setColor(msg.guild.me.displayHexColor)

      if(!queue || !queue.songs[0]){

        eb.setTitle("No music playing");
            eb.setDescription("\u23F9 "+bar(-1)+" "+volumeIcon(!queue?100:queue.volume));
      } else if(queue.songs) {

        if(queue.requester) {

          let u = msg.guild.members.get(queue.requester.id);

          if(!u)
            eb.setAuthor('Unkown (ID:' + queue.requester.id + ')')
          else
            eb.setAuthor(u.user.tag, u.user.displayAvatarURL)
        }

        if(queue.songs[0]) {
        try {
            eb.setTitle(queue.songs[0].title);
            eb.setURL(queue.songs[0].url);
        } catch (e) {
          eb.setTitle(queue.songs[0].title);
        }
}
        eb.setDescription(embedFormat(queue))

      }

      return {
        mes: m,
        embed: eb
      }

    }

