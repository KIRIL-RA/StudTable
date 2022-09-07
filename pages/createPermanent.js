import DaySelector from "../components/common/DaySelector/DaySelector";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useHttp from '../hooks/useHttps'
const parameters = require('../parameters.json')
import { timetableFetching, timetableFetched, timetableFetchingError } from "../actions/actions";
import checkLogin from "../functions/checklogin";


const createPermanent = () => {
    const { request } = useHttp();
    const {selectedDay, timetable} = useSelector(state => state.reducer);
    const dispatch = useDispatch();

    useEffect(() => checkLogin(), [])

    useEffect(() => {
        if (selectedDay !== ''){
            dispatch(timetableFetching())
            let body = `{"request": "per", "day": "${selectedDay}"}`

            request(`${parameters.API_HOST}/gettable`, 'POST', body)
                .then(result => dispatch(timetableFetched(result.data)))
                .catch(() => dispatch(timetableFetchingError()))
        }
    }, [selectedDay])
    return (
        <>
            <div>Header</div>
            <div>
                <h3>Обновление расписания:</h3>
                <DaySelector />
                <div>
                    <h1>{timetable[0]?.lessionName}</h1>
                    <h2>{timetable[0]?.teacher}</h2>
                    <h2>{timetable[0]?.audice}</h2>
                </div>
                <div>
                    <h1>{timetable[1]?.lessionName}</h1>
                </div>
                <div>
                    <h1>{timetable[2]?.lessionName}</h1>
                </div>
                <div>
                    <h1>{timetable[3]?.lessionName}</h1>
                </div>
                <div>
                    <h1>{timetable[4]?.lessionName}</h1>
                </div>
                <div>
                    <h1>{timetable[5]?.lessionName}</h1>
                </div>
        
            </div>
        </>
    )
}

export default createPermanent;