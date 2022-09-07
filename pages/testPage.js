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
            day: "Monday",
            request:"per"
        };

        request(`${parameters.API_HOST}/gettable`, 'POST', JSON.stringify(body));
    };

    const onClickedGetLessons = () => {
        let body = {
        };

        request(`${parameters.API_HOST}/getdisciplinies`, 'POST', JSON.stringify(body));
    };
    
    const ZZZ = () => {
        request(`${parameters.API_HOST}/checklogin`, 'POST')
    }

    let date = new Date; 

    return (
        <div>
            <button onClick={() => onClickedUpdateTTPP()}>Update time table permanent permanent</button>
            <button onClick={() => onClickedGetTT()}>Get time table</button>
            <button onClick={() => onClickedGetLessons()}>Get available lessons</button>
            <button onClick={() => ZZZ()}>ZZZ</button>
        </div>
    )
}

export default testPage;