  class UserNotFoundError extends Error{
    constructor(message){
        super(message);
        this.name = "UserNotFound";
    }
  }

class UserLoginDataIncorrectError extends Error {
    constructor(message) {
        super(message);
        this.name = "UserLoginDataIncorrect";
    }
}

class UserNotLoginedError extends Error {
    constructor(message) {
        super(message);
        this.name = "UserNotLogined";
    }
}

class UserHasNoPermission extends Error{
    constructor(message){
        super(message);
        this.name = "UserHasNoPermission";
    }
};

module.exports = {UserNotFoundError, UserLoginDataIncorrectError, UserNotLoginedError, UserHasNoPermission};