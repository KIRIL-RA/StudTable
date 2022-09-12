import DaySelector from "../components/common/DaySelector/DaySelector";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const parameters = require('../parameters.json')
import { timetableFetching, timetableFetched, timetableFetchingError, setSelectedDay } from "../actions/actions";
import checkLogin from "../functions/checklogin";
import ChangeTimetableModal from "../components/common/ChangeTimetableModal/ChangeTimetableModal";
import useHttp from "../hooks/useHttps";
import styles from "../styles/pages/createPermanent.module.css"

const createPermanent = () => {
    const [isVisiable, setIsVisiable] = useState(false);
    const [lessionNum, setLessionNum] = useState();
    const {selectedDay, timetable} = useSelector(state => state.reducer);
    const dispatch = useDispatch();
    const onOpen = (i) => {
        setIsVisiable(true)
        setLessionNum(i)
    }
    const onClose = () => {
        setIsVisiable(false)
    };

    const { request } = useHttp();

    const fetchTimetable = () => {
        dispatch(timetableFetching())
        let body = {request: 'per', day: selectedDay}

        request(`${parameters.API_HOST}/gettable`, 'POST', JSON.stringify(body))
            .then(result => dispatch(timetableFetched(result.data)))
            .catch(() => dispatch(timetableFetchingError()))
    }
    useEffect(() => checkLogin(), []); 

    useEffect(() => {
        if (selectedDay !== ''){
            fetchTimetable()
        }
    }, [selectedDay])
    
    let timetableList = Object.keys(timetable).map((item, i) => {

        return (
            <>
                <div key={i+1} onClick={() => onOpen(i)} className={styles.timetableItem__wrapper}>
                    <div className={styles.time__wrapper}>{timetable[item].time}</div>
                    <div className={styles.textItems__wrapper}>
                        <span className={styles.lessionName}>{timetable[item].lessionName}</span>
                        <br></br>
                        <span>{timetable[item].teacher}</span>
                    </div>
                    <div>{timetable[item].audience}</div>
                    {timetable[item].type === null ? <p></p> : null}
                </div>
            </>
        )
    })

    return (
        <>
            <h1 className={styles.instedOfLayout}>Stubtable</h1>
            <div>
                <h3 className={styles.createPermanent__title}>Обновление расписания:</h3>
                <DaySelector />
                {timetableList}
                <ChangeTimetableModal isVisiable={isVisiable} onClose = {onClose} lessionNum={lessionNum} fetchTimetable={fetchTimetable}></ChangeTimetableModal>
            </div>
        </>
    )
}

export default createPermanent;