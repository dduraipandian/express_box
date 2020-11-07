const {getDatabase} = require('../../server/database');

class WebModel{

    constructor(message){
        this.message = message;
    }

    get db(){
        return getDatabase('web');
    }

    getCollection(name){
        return this.db.collection(name);
    }

    save() {
        const collection = this.getCollection('web_message')
        collection.insertOne({message: this.message});
    }
}

module.exports = WebModel;