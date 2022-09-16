import useHttp from "../hooks/useHttps";
const parameters = require('../parameters.json')
const testPage = () => {
    const { request } = useHttp();

    const onClickedUpdateTTPP = () => {
        let body = {
            day: "Tuesday",
            changes: {
                1: {
                    lessionName: "Math",
                    audience: 409,
                    teacher: "Matcheno P. V.",
                    type: "per"
                },
                2: {
                    numerator: {
                        lessionName: "Math1",
                        audience: 408,
                        teacher: "Matcheno ",
                    },
                    denumerator: {
                        lessionName: "Math",
                        audience: 409,
                        teacher: "Matcheno P. V.",
                    },
                    type: "byWeek"
                }
            },
            type: "per"
        };

        request(`${parameters.API_HOST}/updatetable`, 'POST', JSON.stringify(body));
    };

    const onClickedGetTT = () => {
        let body = {
            day: "Tuesday",
            request: "per"
        };

        request(`${parameters.API_HOST}/gettable`, 'POST', JSON.stringify(body));
    };

    const onClickedGetLessons = () => {


        request(`${parameters.API_HOST}/getdisciplinies`, 'POST');
    };

    const onClickedCheckLogin = () => {
        request(`${parameters.API_HOST}/checklogin`, 'POST')
    }

    const onClickedregisryNewUser = () => {
        let body = {
            userName: "Anna",
            password: "qwerty",
            accountType: "Student",
            email: "anna@dosbox.com",
            realInfo: {
                firstName: "Анна",
                secondName: "Гончарова"
            },
            academyInfo: {
                id: "cdfasff",
                directionId: "02.03.01",
                group: "3.2",
                faculty: "Mathematics",
                course: "1",
                studentIdNumber: "12112"
            }
        };

        request(`${parameters.API_HOST}/registryuser`, 'POST', JSON.stringify(body))
    }

    const onClickedGetInfo = () => {
        request(`${parameters.API_HOST}/getuserinfo`, 'POST')
    }

    const onClickedGetUncofirmedAccounts = () => {
        request(`${parameters.API_HOST}/getunconfirmedaccounts`, 'POST')
    }

    const onClickedConfirmAccount = () => {
        let body = {
            userId: "7779494225911263"
        };

        request(`${parameters.API_HOST}/confirmaccount`, 'POST', JSON.stringify(body));
    };

    const onClickGetSpecialPermicions = () => {
        request(`${parameters.API_HOST}/getspecificpermissions`, 'POST')
    }

    const onClickGetAcademies = () => {
        let body = {
            request: "gd",
            academyId: "cdfasff",
            faculty: "Mathematics"
        };

        request(`${parameters.API_HOST}/getacademyinfo`, 'POST', JSON.stringify(body))
    }

    return (
        <div>
            <button onClick={() => onClickedUpdateTTPP()}>Update time table permanent permanent</button>
            <button onClick={() => onClickedGetTT()}>Get time table</button>
            <button onClick={() => onClickedGetLessons()}>Get available lessons</button>
            <button onClick={() => onClickedCheckLogin()}>Check login</button>
            <button onClick={() => onClickedregisryNewUser()}>Registry new user</button>
            <button onClick={() => onClickedGetInfo()}>Get user info</button>
            <button onClick={() => onClickedGetUncofirmedAccounts()}>Get uncofirmed accounts</button>
            <button onClick={() => onClickedConfirmAccount()}>Confirm account</button>
            <button onClick={() => onClickGetSpecialPermicions()}>Get special permissions</button>
            <button onClick={() => onClickGetAcademies()}>Get academies</button>
        </div>
    )
}

export default testPage;