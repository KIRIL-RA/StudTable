import useHttp from "../hooks/useHttps";
const parameters = require('../parameters.json')
const testPage = () => {
    const { request } = useHttp();

    const onClickedUpdateTTPP = () => {
        let body = {
            day: "Monday",
            changes:{

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

    let date = new Date; 

    return (
        <div>
            <button onClick={() => onClickedUpdateTTPP()}>Update time table permanent permanent</button>
            <button onClick={() => onClickedGetTT()}>Get time table</button>
        </div>
    )
}

export default testPage;