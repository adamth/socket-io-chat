class Clients {
    constructor() {
        this.list = [];
    } 

    getUser(id) {
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].id === id) {
                return this.list[i];
            }
        }
        return false;
    }

    getName(id) {
        for (let i = 0; i < this.list.length; i++) {
            console.log(this.list[i]);
            if (this.list[i].id === id) {
                return this.list[i].name;
            }
        }
        return false;
    }
    
    add(client) {
         console.log(client);
        this.list.push(client);
    }
    
    remove(id) {
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].id === id) {
                this.list.splice(i, 1);
                return;
            }
        }
    }
}

module.exports = Clients;
