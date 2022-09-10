import useHttp from "../hooks/useHttps";
const parameters = require('../parameters.json')
const testPage = () => {
    const { request } = useHttp();

    const onClickedUpdateTTPP = () => {
        let body = {
            day: "Tuesday",
            changes:{
                1:{
                    lessionName:"Math",
                    audience:409,
                    teacher:"Matcheno P. V.",
                    type:"per"
                }
            },
            type:"per"
        };

        request(`${parameters.API_HOST}/updatetable`, 'POST', JSON.stringify(body));
    };

    const onClickedGetTT = () => {
        let body = {
            day: "Wednesday",
            request:"per"
        };

        request(`${parameters.API_HOST}/gettable`, 'POST', JSON.stringify(body));
    };

    const onClickedGetLessons = () => {
        let body = {
        };

        request(`${parameters.API_HOST}/getdisciplinies`, 'POST', JSON.stringify(body));
    };
    
    const onClickedCheckLogin = () => {
        request(`${parameters.API_HOST}/checklogin`, 'POST')
    }

    const onClickedregisryNewUser = () => {
        let body = {
            userName:"Anna",
            password: "qwerty",
            accountType: "Student",
            email:"anna@dosbox.com",
            realInfo:{
                firstName:"Анна",
                secondName:"Гончарова"
            },
            academyInfo:{
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

    return (
        <div>
            <button onClick={() => onClickedUpdateTTPP()}>Update time table permanent permanent</button>
            <button onClick={() => onClickedGetTT()}>Get time table</button>
            <button onClick={() => onClickedGetLessons()}>Get available lessons</button>
            <button onClick={() => onClickedCheckLogin()}>Check login</button>
            <button onClick={() => onClickedregisryNewUser()}>Registry new user</button>
            <button onClick={() => onClickedGetInfo()}>Get user info</button>
        </div>
    )
}

export default testPage;