
/**
 * Samples response from server
 */
module.exports = {
    /**
     * Sample for default response
     * @param {string} message 
     * @param {number} statusCode 
     * @returns String, contains response status and status code
     */
    DefaultResponse(message, statusCode) { return `{"Status":"${message}", "statusCode":"${statusCode}"}`; },

    ToUserUserData(userData, statusCode) {
        let response = {
            userData: userData,
            statusCode: statusCode
        };

        return JSON.stringify(response);
    },

    Data(data, statusCode) {
        let response = {
            data: data,
            statusCode: statusCode
        }

        return JSON.stringify(response);
    },

}