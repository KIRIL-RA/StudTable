import styles from "../styles/pages/timetable.module.css"
import checkLogin from "../functions/checklogin";
import { useEffect } from "react";
import getDayString from '../functions/getDayString'
import useHttp from "../hooks/useHttps";
const parameters = require('../parameters.json')
import getCurrentDate from "../functions/getCurrentDate";
import { useSelector, useDispatch } from "react-redux";
import { timetableFetching, timetableFetched, timetableFetchingError} from '../actions/actions'

const timetable = () => {
    const { request } = useHttp();
    const dispatch = useDispatch();
    useEffect(() => checkLogin(), []); 

    const {timetable} = useSelector(state => state.reducer)

    useEffect(() => {
        dispatch(timetableFetching())
        let body = {request: 'per', day: 'Monday'} //заменить статичную хуету на getDayString

        request(`${parameters.API_HOST}/gettable`, 'POST', JSON.stringify(body))
            .then(result => dispatch(timetableFetched(result.data)))
            .catch(() => dispatch(timetableFetchingError()))
    }, [/* selectedDay */])

    let timetableList = Object.keys(timetable).map(item => {

        return (
            <div className={styles.timetable__item} key={timetable[item].time}>
                <div className={styles.time__wrapper}>{timetable[item].time}</div>
                <div className={styles.textInfo__wrapper}>
                    <span className={styles.lessionName}>{timetable[item].lessionName}</span>
                    <br></br>
                    <span>{timetable[item].teacher}</span>
                </div>
                <div>{timetable[item].audience}</div>
                {timetable[item].type === null ? <p></p> : null}
            </div>
        )
    })

    return (
        <>
            <header className={styles.header}>
                <h1 className={styles.header__title}>Stubtable</h1>
            </header>
            <main>
                <h2 className={styles.main__title}>{getCurrentDate()}</h2>
                <div className={styles.timetable__wrapper}>
                    {timetableList}
                </div>
            </main>
        </>
    )
}

export default timetable;