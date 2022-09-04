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

    let date = new Date; 

    return (
        <div>
            <button onClick={() => onClickedUpdateTTPP()}>Update time table permanent permanent</button>
        </div>
    )
}

export default testPage;