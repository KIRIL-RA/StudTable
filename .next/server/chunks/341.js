"use strict";
exports.id = 341;
exports.ids = [341];
exports.modules = {

/***/ 3341:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


const DaysOfWeek = __webpack_require__(9557);
const { NotAllParametersWereRecievedError  } = __webpack_require__(3021);
const DBWork = __webpack_require__(1799);
/**
 * Getting week type of concrete day
 * @param {Number} dayUTC 
 */ function GetWeekType(dayUTC) {
    let unfilledDays;
    let WeekDayOfFirstSeptember;
    let firstOfSeptemberFullWeekMillis;
    let firstOfSeptember;
    let firstOfSeptemberMillis;
    let timeDelta;
    let inputDate = new Date(dayUTC);
    let month = inputDate.getMonth() + 1;
    let inputDateMillis = inputDate.getTime();
    // If we in second part of study year
    if (month < 9) firstOfSeptember = new Date(inputDate.getFullYear() - 1, 9 - 1, 1);
    else firstOfSeptember = new Date(inputDate.getFullYear(), 9 - 1, 1);
    // Calculate number of weeks elapsed
    firstOfSeptemberMillis = firstOfSeptember.getTime();
    WeekDayOfFirstSeptember = firstOfSeptember.getDay();
    unfilledDays = (WeekDayOfFirstSeptember - 1) * 24 * 60 * 60 * 1000;
    firstOfSeptemberFullWeekMillis = firstOfSeptemberMillis - unfilledDays;
    timeDelta = inputDateMillis - firstOfSeptemberFullWeekMillis;
    timeDelta = Math.trunc(timeDelta / (7 * 24 * 60 * 60 * 1000));
    if (timeDelta % 2 == 0) return "numerator";
    return "denumerator";
}
const daysOfWeekArr = [
    DaysOfWeek.MONDAY,
    DaysOfWeek.TUESDAY,
    DaysOfWeek.WEDNESDAY,
    DaysOfWeek.THURSDAY,
    DaysOfWeek.FRIDAY,
    DaysOfWeek.SATURDAY,
    DaysOfWeek.SUNDAY
];
class DayOfWeek {
    /**
     * Create object with day timetable for day of week
     * @param {DBWork} DBWork 
     * @param {any} day 
     * @param {string} academyId
     * @param {string} direction
     * @param {string} group
     * @param {string} course
     * @param {object} changes
     */ constructor(DBWork, day, academyId, direction, group, course, changes = undefined){
        if (DBWork === undefined || DBWork === null) throw new NotAllParametersWereRecievedError("You must specify all parameters");
        this.database = DBWork;
        this.day = day;
        this.academyId = academyId;
        this.direction = direction;
        this.group = group;
        this.course = course;
        this.changes = changes;
    }
    /**
     * Validate timeTable
     */ async Validate() {}
    /**
     * Updating timeTable
     */ async UpdateTimeTable() {
        if (this.changes === undefined) return;
        // Data validation
        await this.Validate();
        // Getting topical timeTable
        let timeGrid = await this.GetTimeGrid();
        let timeTable = await this.GetTimeTable();
        let timeTableDays = await this.GetTimeTableAllDays();
        let lessionsCount = Object.keys(timeGrid).length;
        let newTimeTable = {};
        // Forming new timeTable
        for(let lessionNumber = 0; lessionNumber < lessionsCount; lessionNumber++){
            let lessionNumberS = String(lessionNumber);
            let change = this.changes[lessionNumberS];
            let timePeriod = timeGrid[lessionNumberS];
            let topicalTimeItem = timeTable[lessionNumberS];
            // If no changes in timeTable
            if (change === undefined) {
                newTimeTable[lessionNumberS] = topicalTimeItem;
                newTimeTable[lessionNumberS].time = timePeriod;
            } else {
                newTimeTable[lessionNumberS] = change;
                newTimeTable[lessionNumberS].time = timePeriod;
            }
        }
        timeTableDays[this.day] = newTimeTable;
        await this.database.UpdateTimeTable(this.academyId, this.direction, this.group, this.course, timeTableDays);
    }
    /**
     * Get timne table for all days
     * @returns Timetable for all days 
     */ async GetTimeTableAllDays() {
        const database = this.database;
        let result = await database.GetTimeTable(this.academyId, this.direction, this.group, this.course);
        return result.table;
    }
    /**
     * Getting timeTable from database
     */ async GetTimeTable() {
        const database = this.database;
        let result = await database.GetTimeTable(this.academyId, this.direction, this.group, this.course);
        let dayTimeTable = result.table[this.day];
        // If timeTable for this day of week exist
        if (dayTimeTable !== undefined) return dayTimeTable;
        // If timeTable for this day of week not exist, forming object without lessons
        dayTimeTable = {};
        let timeGrid = await this.GetTimeGrid();
        let timeGridKeys = Object.keys(timeGrid);
        timeGridKeys.forEach((lessonNum)=>{
            dayTimeTable[lessonNum] = {
                type: null,
                time: timeGrid[lessonNum]
            };
        });
        return dayTimeTable;
    }
    /**
     * Getting time grid from database
     */ async GetTimeGrid() {
        const database = this.database;
        let result = await database.GetUniversityInfo(this.academyId);
        return result.timeGrid;
    }
}
class SpecificDay {
    /**
     * Create object with day timetable for spicific day
     * @param {DBWork} DBWork 
     * @param {any} day 
     * @param {string} academyId
     * @param {string} direction
     * @param {string} group
     * @param {string} course
     * @param {object} changes
     */ constructor(DBWork, day, academyId, direction, group, course, changes = undefined){
        if (DBWork === undefined || DBWork === null) throw new NotAllParametersWereRecievedError("You must specify all parameters");
        this.database = DBWork;
        this.day = day;
        this.academyId = academyId;
        this.direction = direction;
        this.group = group;
        this.course = course;
        this.changes = changes;
    }
    /**
     * Validate timeTable
     */ async Validate() {}
    /**
     * Getting timeTable from database
     */ async GetTimeTable() {
        const database = this.database;
        let date = this.GetFormattedDate();
        // If day have any deviations from main timeTable
        let result = await database.GetTimeTable(this.academyId, this.direction, this.group, this.course, date.dateString);
        if (result != null) return result.table;
        // If day doesnt have any deviations from main timeTable
        result = await database.GetTimeTable(this.academyId, this.direction, this.group, this.course);
        // If timeTable for this day of week exist
        if (result.table[daysOfWeekArr[date.weekDay - 1]] !== undefined) return result.table[daysOfWeekArr[date.weekDay - 1]];
        // If timeTable for this day of week not exist, forming object without lessons
        let dayTimeTable = {};
        let timeGrid = await this.GetTimeGrid();
        let timeGridKeys = Object.keys(timeGrid);
        timeGridKeys.forEach((lessonNum)=>{
            dayTimeTable[lessonNum] = {
                type: null,
                time: timeGrid[lessonNum]
            };
        });
        return dayTimeTable;
    }
    /**
     * Getting time grid from database
     */ async GetTimeGrid() {
        const database = this.database;
        let result = await database.GetUniversityInfo(this.academyId);
        return result.timeGrid;
    }
    /**
     * 
     * Getting date, formatted for database
     */ GetFormattedDate() {
        let dateArray = String(this.day).split(".");
        let date_ob = new Date(Number(dateArray[2]), Number(dateArray[1]) - 1, Number(dateArray[0]));
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        return {
            dateOb: date_ob,
            weekDay: date_ob.getDay(),
            dateString: `${date}.${month}.${year}`
        };
    }
    GetWeekType() {
        let date = this.GetFormattedDate();
        return GetWeekType(date.dateOb.getTime());
    }
}
module.exports = {
    DayOfWeek,
    SpecificDay
};


/***/ }),

/***/ 9557:
/***/ ((module) => {

module.exports = JSON.parse('{"MONDAY":"Monday","TUESDAY":"Tuesday","WEDNESDAY":"Wednesday","THURSDAY":"Thursday","FRIDAY":"Friday","SATURDAY":"Saturday","SUNDAY":"Sunday"}');

/***/ })

};
;