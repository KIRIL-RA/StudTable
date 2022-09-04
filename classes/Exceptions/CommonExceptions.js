class NotAllParametersWereRecievedError extends Error {
    constructor(message) {
        super(message);
        this.name = "NotAllParametersWereRecieved";
    }
}

class IncorrectDataException extends Error {
    constructor(message) {
        super(message);
        this.name = "IncorrectData";
    }
}


module.exports = {NotAllParametersWereRecievedError, IncorrectDataException};