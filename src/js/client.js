class Client {
    constructor(userid) {
        this.id = userid;
        this.name = this.id.slice(0, 4);
    }
    
    setName(n) {
        this.name = n;
    }
}

module.exports = Client;
