class History {
    constructor() {
        this.messages = [];
    }

    add(message) {
        if (this.messages.length > 100) {
            this.messages.slice(1, this.messages.length + 1);
            this.messages.push(message);
        } else {
        // Otherwise just add the new message
            this.messages.push(message);
        }
    }
}

module.exports = History;
