module.exports = {

    pad: function pad(number, digits) {
        Number(number); Number(digits);
        if(number<0) return;
        let n = number;
        if(n === 0) {
            ++n;
        }
        let count = 0;
        if(n >= 1) ++count;
        while (n/10 >= 1) {
            n /= 10;
            ++count;
        }
        let diff;
        diff = digits - count;
        if (diff < 0 ) return;
        let numArray = number.toString().split("");
        for (i = 0; i < diff; i++) {

            numArray.unshift('0');
        }
        return numArray.join('')
    },
    
    rgb: function rgb(inputColor) {

        const Color = require('color')
        return Color(inputColor).rgbNumber()
    },

    linkToMessage: async function linkToMessage(link, client) {
        let arr = link.split('/').slice(Math.max(link.split('/').length - 2, 0));
        return await (await client.channels.fetch(arr[0])).messages.fetch(arr[1]);
    },

    getLocalTime: function getLocalTime(date) {
        if(date === undefined) {date = new Date()}
        let arr = []
        arr.push(module.exports.pad(date.getHours(), 2));
        arr.push(module.exports.pad(date.getMinutes(), 2));
        arr.push(module.exports.pad(date.getSeconds(), 2));
        if(milliseconds === true) arr.push(module.exports.pad(date.getUTCMilliseconds(), 3))
        return arr.join(':')
    },
    
    getUTCTime: function getTime(date, milliseconds) {
        if(date === undefined) {date = new Date()}
        let arr = []
        arr.push(module.exports.pad(date.getUTCHours(), 2));
        arr.push(module.exports.pad(date.getUTCMinutes(), 2));
        arr.push(module.exports.pad(date.getUTCSeconds(), 2));
        if(milliseconds === true) arr.push(module.exports.pad(date.getUTCMilliseconds(), 3))
        return arr.join(':')
    },

    since: function since(timestamp, max) {

        if(max === undefined) max = 6;   
        const seconds = Math.round((new Date() - timestamp)/1000);
        let msgArray = [];
        let count = 0;
        
        let interval = Math.floor(seconds / (3600*24*30.4375*12))
        if(interval === 1 && count < max) {
            msgArray.push(`${interval} year`);
            ++count;
        } else if (interval > 1 && count < max) {
            msgArray.push(`${interval} years`);
            ++count;
        }

        const rMonths = seconds % (3600*24*30.4375*12);
        interval = Math.floor(rMonths / (3600*24*30.4375))
        if(interval === 1 && count < max) {
            msgArray.push(`${interval} month`);
            ++count;
        } else if (interval > 1 && count < max) {
            msgArray.push(`${interval} months`);
            ++count;
        }

        const rDays = seconds % (3600*24*30.4375);
        interval = Math.floor(rDays / (3600*24));
        if(interval === 1 && count < max) {
            msgArray.push(`${interval} day`);
            ++count;
        } else if (interval > 1 && count < max) {
            msgArray.push(`${interval} days`);
            ++count;
        }

        const rHours = seconds % 3600*24;
        interval = Math.floor(rHours / 3600);
        if(interval === 1 && count < max) {
            msgArray.push(`${interval} hour`);
            ++count;
        } else if (interval > 1 && count < max) {
            msgArray.push(`${interval} hours`);
            ++count;
        }

        const rMinutes = seconds % 3600;
        interval = Math.floor(rMinutes / 60);
        if(interval === 1 && count < max) {
            msgArray.push(`${interval} minute`);
            ++count;
        } else if (interval > 1 && count < max) {
            msgArray.push(`${interval} minutes`);
            ++count;
        }

        const rSeconds = seconds % 60
        interval = Math.floor(rSeconds);
        if(interval === 1 && count < max) {
            msgArray.push(`${interval} second`);
            ++count;
        } else if (interval > 1 && count < max) {
            msgArray.push(`${interval} seconds`);
            ++count;
        }

        return msgArray.join(', ')
    },
}