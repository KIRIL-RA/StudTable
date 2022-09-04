class DataNotFoundException extends Error{
    constructor(message){
        super(message);
        this.name = "DataNotFound";
    }
}

module.exports = {DataNotFoundException};