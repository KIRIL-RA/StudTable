import DaySelector from "../components/common/DaySelector/DaySelector";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useHttp from '../hooks/useHttps'
const parameters = require('../parameters.json')
import { timetableFetching, timetableFetched, timetableFetchingError } from "../actions/actions";
import checkLogin from "../functions/checklogin";
import ChangeTimetableModal from "../components/common/ChangeTimetableModal/ChangeTimetableModal";
import { useState } from "react";


const createPermanent = () => {
    const [isVisiable, setIsVisiable] = useState(false);
    const { request } = useHttp();
    const {selectedDay, timetable} = useSelector(state => state.reducer);
    const dispatch = useDispatch();
    const onClose = () => setIsVisiable(!isVisiable);
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
                <div onClick={onClose}>
                    <h1>{timetable[0]?.lessionName}</h1>
                </div>
                <div onClick={onClose}>
                    {timetable[1]?.type === null ? <h1>Окно</h1> : null}
                </div>
                <ChangeTimetableModal isVisiable={isVisiable} onClose = {onClose}></ChangeTimetableModal>
            </div>
        </>
    )
}

export default createPermanent;