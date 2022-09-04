class FarmNotFoundException extends Error {
    constructor(message) {
        super(message);
        this.name = "FarmNotFound";
    }
}

class FarmGetAccessException extends Error {
    constructor(message) {
        super(message);
        this.name = "AccessDataNotValid";
    }
}

class GetTasksException extends Error{
    constructor(message) {
        super(message);
        this.name = "GetTasksError";
    }
}

class TasksNotFondException extends Error{
    constructor(message) {
        super(message);
        this.name = "TasksNotFond";
    }
}

class GetWorkersExceptin extends Error{
    constructor(message) {
        super(message);
        this.name = "ErrorGetWorkers";
    }
}

class WorkerNotOwnedToFarmException extends Error{
    constructor(message) {
        super(message);
        this.name = "WorkerNotOwnedToFarm";
    }
}

class AddTaskException extends Error{
    constructor(message) {
        super(message);
        this.name = "AddTaskError";
    }
}

class CultureNotOwnedToUserException extends Error{
    constructor(message) {
        super(message);
        this.name = "CultureNotOwnedToUserError";
    }
}

module.exports = {FarmNotFoundException, FarmGetAccessException, GetTasksException, TasksNotFondException, GetWorkersExceptin, WorkerNotOwnedToFarmException, AddTaskException, CultureNotOwnedToUserException  };