const DaysOfWeek = require("../pages/static/DaysOfWeeks.json");
const { NotAllParametersWereRecievedError } = require("./Exceptions/CommonExceptions");
const DBWork = require("./databaseWork");
const { transformSortedSetWithScoresReply } = require("@redis/client/dist/lib/commands/generic-transformers");

const daysOfWeekArr = [
    DaysOfWeek.MONDAY,
    DaysOfWeek.TUESDAY,
    DaysOfWeek.WEDNESDAY,
    DaysOfWeek.THURSDAY,
    DaysOfWeek.FRIDAY,
    DaysOfWeek.SATURDAY,
    DaysOfWeek.SUNDAY
];

class DayOfWeek{
    /**
     * Create object with day timetable for day of week
     * @param {DBWork} DBWork 
     * @param {any} day 
     * @param {string} academyId
     * @param {string} direction
     * @param {string} group
     * @param {string} course
     * @param {object} changes
     */
    constructor(DBWork, day, academyId, direction, group, course, changes = undefined){
        if (DBWork === undefined || DBWork === null) throw new NotAllParametersWereRecievedError("You must specify all parameters");

        this.database = DBWork;
        this.day = day;
        this.academyId = academyId;
        this.direction = direction;
        this.group = group;
        this.course = course
        this.changes = changes;
    }

    /**
     * Validate timeTable
     */
    async Validate(){

    }

    /**
     * Updating timeTable
     */
    async UpdateTimeTable(){
        if(this.changes === undefined) return;

        // Data validation
        await this.Validate();

        // Getting topical timeTable
        let timeGrid = await this.GetTimeGrid();
        let timeTableDays = await this.GetTimeTable();
        let timeTable = timeTableDays[this.day];

        let lessionsCount = Object.keys(timeGrid).length;
        let newTimeTable = {};

        // Forming new timeTable
        for(let lessionNumber = 0; lessionNumber < lessionsCount; lessionNumber++){
            let lessionNumberS = String(lessionNumber);
            let change = this.changes[lessionNumberS];
            let timePeriod = timeGrid[lessionNumberS];
            let topicalTimeItem = timeTable[lessionNumberS];

            // If no changes in timeTable
            if(change === undefined){
                newTimeTable[lessionNumberS] = topicalTimeItem;
                newTimeTable[lessionNumberS].time = timePeriod;
            }

            // If timeTable were changed
            else{
                newTimeTable[lessionNumberS] = change;
                newTimeTable[lessionNumberS].time = timePeriod;
            }
        }

        timeTableDays[this.day] = newTimeTable;
        await this.database.UpdateTimeTable(this.academyId, this.direction, this.group, this.course, timeTableDays);
    }

    /**
     * Getting timeTable from database
     */
    async GetTimeTable(){
        const database = this.database;
        let result = await database.GetTimeTable(this.academyId, this.direction, this.group, this.course);

        return result.table;
    }

    /**
     * Getting time grid from database
     */
    async GetTimeGrid(){
        const database = this.database;
        let result = await database.GetUniversityInfo(this.academyId);

        return result.timeGrid;
    }
}

class SpecificDay{
    /**
     * Create object with day timetable for spicific day
     * @param {DBWork} DBWork 
     * @param {any} day 
     * @param {string} academyId
     * @param {string} direction
     * @param {string} group
     * @param {string} course
     * @param {object} changes
     */
    constructor(DBWork, day, academyId, direction, group, course, changes = undefined){
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
     */
     async Validate(){

    }

    /**
     * Getting timeTable from database
     */
     async GetTimeTable(){
        const database = this.database;
        let date = this.GetFormattedDate();

        // If day have any deviations from main timeTable
        let result = await database.GetTimeTable(this.academyId, this.direction, this.group, this.course, date.dateString);
        if(result != null) return result.table;

        // If day doesnt have any deviations from main timeTable
        result = await database.GetTimeTable(this.academyId, this.direction, this.group, this.course);
        return result.table[daysOfWeekArr[date.weekDay-1]];
    }

    /**
     * Getting time grid from database
     */
     async GetTimeGrid(){
        const database = this.database;
        let result = await database.GetUniversityInfo(this.academyId);

        return result.timeGrid;
    }

    /**
     * 
     * Getting date, formatted for database
     */
    GetFormattedDate(){
        let dateArray = String(this.day).split('.');

        let date_ob = new Date(Number(dateArray[2]), Number(dateArray[1])-1, Number(dateArray[0]));
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();

        return { 
            weekDay: date_ob.getDay(),
            dateString: `${date}.${month}.${year}` 
        };
    }
}

module.exports = {DayOfWeek, SpecificDay};