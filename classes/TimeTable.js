const DaysOfWeek = require("../pages/static/DaysOfWeeks.json");
const { NotAllParametersWereRecievedError } = require("./Exceptions/CommonExceptions");
const DBWork = require("./databaseWork");
const { transformSortedSetWithScoresReply } = require("@redis/client/dist/lib/commands/generic-transformers");

class DayOfWeek{
    /**
     * Create object with day timetable for day of week
     * @param {DBWork} DBWork 
     * @param {any} day 
     * @param {string} academyId
     * @param {string} direction
     * @param {string} group
     * @param {object} changes
     */
    constructor(DBWork, day, academyId, direction, group, changes = undefined){
        if (DBWork === undefined || DBWork === null) throw new NotAllParametersWereRecievedError("You must specify all parameters");

        this.database = DBWork;
        this.day = day;
        this.academyId = academyId;
        this.direction = direction;
        this.group = group;
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
        await this.database.UpdateTimeTable(this.academyId, this.direction, this.group, this.day, timeTableDays);
    }

    /**
     * Getting timeTable from database
     */
    async GetTimeTable(){
        const database = this.database;
        let result = await database.GetTimeTable(this.academyId, this.direction, this.group);

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
     * @param {object} changes
     */
    constructor(DBWork, day, academyId, direction, group, changes = undefined){
        if (DBWork === undefined || DBWork === null) throw new NotAllParametersWereRecievedError("You must specify all parameters");

        this.database = DBWork;
        this.day = day;
        this.academyId = academyId;
        this.direction = direction;
        this.group = group;
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
        let result = await database.GetTimeTable(this.academyId, this.direction, this.group);

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

module.exports = {DayOfWeek};