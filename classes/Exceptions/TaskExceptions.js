class DateConflict extends Error {
    constructor(message) {
        super(message);
        this.name = "DateConflict";
    }
}

class WorkerHasNoNeededAccessLevel extends Error{
    constructor(message) {
        super(message);
        this.name = "WorkerHasNoNeededAccessLevelError";
    }
}

module.exports = {DateConflict,WorkerHasNoNeededAccessLevel};