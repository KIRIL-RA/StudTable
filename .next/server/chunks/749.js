"use strict";
exports.id = 749;
exports.ids = [749];
exports.modules = {

/***/ 749:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


const DBWork = __webpack_require__(1799);
const { UserAreadyConfirmed , UserHasNoPermission  } = __webpack_require__(1011);
class Academy {
    /**
     * Work with academy
     * @param {DBwork} database 
     * @param {string} id 
     */ constructor(database, id){
        this.database = database;
        this.id = id;
        this.data;
        this.isInitialized = false;
    }
    /**
     * Init academy
     */ async Init() {
        let database = this.database;
        this.data = await database.GetUniversityInfo(this.id);
        this.isInitialized = true;
    }
    /**
     * Get faculties of university
     * @param {Boolean} decrease If true -> decreasing information
     * @returns 
     */ GetFaculties(decrease = false) {
        if (!this.isInitialized) return;
        let faculties = this.data.faculties;
        if (decrease) {
            // Decrreased info contains only names of faculties
            let newFacultiesList = {};
            let facultiesKeys = Object.keys(faculties);
            facultiesKeys.forEach((faculty)=>{
                newFacultiesList[faculty] = {
                    name: faculties[faculty].name
                };
            });
            faculties = newFacultiesList;
        }
        return faculties;
    }
    /**
     * Forming list contains light info about academies
     */ async GetAcademies() {
        const database = this.database;
        let result = await database.GetAcademies();
        let academiesList = [];
        // Formatting raw data
        result.forEach((academy)=>{
            academiesList.push({
                name: academy.name,
                id: academy.id
            });
        });
        return academiesList;
    }
    /**
     * Get directions of faculty
     * @param {String} faculty 
     * @param {Boolean} decrease 
     * @returns 
     */ GetDirections(faculty, decrease = false) {
        if (!this.isInitialized) return;
        let faculties = this.GetFaculties();
        let directions = faculties[faculty].directions;
        if (decrease) {
            // Decrreased info contains only names of directions
            let newDirectionsList = {};
            let directionsKeys = Object.keys(directions);
            directionsKeys.forEach((direction)=>{
                newDirectionsList[direction] = {
                    name: directions[direction].name
                };
            });
            directions = newDirectionsList;
        }
        return directions;
    }
    /**
     * Get disciplinies of specific direction
     * @param {String} direction 
     * @param {String} faculty 
     */ GetDisciplinies(direction, faculty) {
        if (!this.isInitialized) return;
        let directions = this.GetDirections(faculty);
        let disciplinies = directions[direction].disciplinies;
        return disciplinies;
    }
    /**
     * Get unconfirmed accounts
     * @param {any} direction 
     * @param {any} course 
     * @param {any} accountType 
     * @returns 
     */ async GetUnconfirmedAccounts(direction, course, group, accountType) {
        if (!this.isInitialized) return;
        let result = await this.database.GetUnconfirmedAccounts(this.id, direction, course, group, accountType);
        let resultFormatted = [];
        // Sending only not important info
        if (result !== null && result !== undefined) result.forEach((account)=>{
            resultFormatted.push({
                realInfo: account.realInfo,
                userId: account.userId
            });
        });
        return resultFormatted;
    }
    /**
     * Confirm account. Available only for group headman
     * @param {any} userId 
     * @param {object} groupHeadmanAcademyInfo 
     */ async ConfirmAccount(userId, groupHeadmanAcademyInfo) {
        if (!this.isInitialized) return;
        const database = this.database;
        let userInfo = await database.GetUserData({
            userId: userId
        });
        let userAcademy = userInfo.academy;
        if (userInfo.isConfirmed === true) throw new UserAreadyConfirmed("User already confirmed");
        if (userAcademy.id !== groupHeadmanAcademyInfo.id || userAcademy.directionId !== groupHeadmanAcademyInfo.directionId || userAcademy.group !== groupHeadmanAcademyInfo.group || userAcademy.course !== groupHeadmanAcademyInfo.course) throw new UserHasNoPermission("User not in your group");
        await database.ConfirmAccount(userId);
    }
}
module.exports = {
    Academy
};


/***/ })

};
;