class Message {
    constructor(message, user) {
        this.message = message;
        this.user = user;
        
        const padZero = (time) => (time < 10 ? `0${time}` : `${time}`);
        const time = new Date();
        const hours = padZero(time.getHours());
        const minutes = padZero(time.getMinutes());
        const seconds = padZero(time.getSeconds());
    
        this.time = `${hours}:${minutes}:${seconds}`;
    }
}

module.exports = Message;
