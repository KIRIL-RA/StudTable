import styles from "../styles/pages/timetable.module.css"
import checkLogin from "../functions/checklogin";
import { useEffect, useState } from "react";
import getDayString from '../functions/getDayString'
import useHttp from "../hooks/useHttps";
const parameters = require('../parameters.json')
import getCurrentDate from "../functions/getCurrentDate";
import { useSelector, useDispatch } from "react-redux";
import { timetableFetching, timetableFetched, timetableFetchingError} from '../actions/actions'
import Layout from "../components/Layout/Layout";
import Spinner from "../components/major/Spinner/Spinner";

const timetable = () => {
    const { request } = useHttp();
    const dispatch = useDispatch();
    useEffect(() => checkLogin(), []); 
    const [typeOfWeek, setTypeOfWeek] = useState('numerator');
    const [isVisiable, setIsVisiable] = useState(false);

    const onOpen = () => setIsVisiable(true);
    const onClose = () => setIsVisiable(false);

    const {timetable, timetableStatus} = useSelector(state => state.reducer)

    useEffect(() => {
        dispatch(timetableFetching())
        let body = {request: 'per', day: getDayString()} //заменить статичную хуету на getDayString

        request(`${parameters.API_HOST}/gettable`, 'POST', JSON.stringify(body))
            .then(result => dispatch(timetableFetched(result.data)))
            .catch(() => dispatch(timetableFetchingError()))
    }, [/* selectedDay */])

    let timetableList;
    if (timetable){
        timetableList = Object.keys(timetable).map(item => {
            if (item !== 'weekType'){
                if (timetable[item].type === "byWeek"){
                    return (
                        <div className={styles.timetable__item} key={timetable[item].time}>
                            <div className={styles.time__wrapper}>{timetable[item].time}</div>
                            <div className={styles.textInfo__wrapper}>
                                    <span className={styles.lessionName}>{timetable[item][typeOfWeek].lessionName} </span>
                                    {typeOfWeek === 'numerator' ? <span className={styles.vertical}>Числ.</span> : <span className={styles.vertical}>Знам.</span>}
                                    <br></br>
                                    <span>{timetable[item][typeOfWeek].teacher}</span>
                            </div>
                            <div>{timetable[item][typeOfWeek].audience}</div>
                            {timetable[item].type === null ? <p></p> : null}
                        </div>
                    )
                }
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
            }
        }) 
    }

    if(timetableStatus === 'loading'){
        return (
            <>
                <Layout></Layout>
                <Spinner></Spinner>
            </>
        )
    }

    if(timetableStatus === 'idle'){
        return (
            <>  
                <Layout></Layout>
                <main>
                    <h2 className={styles.main__title} onClick={onOpen}>{getCurrentDate()}</h2>
                    <div className={styles.timetable__wrapper}>
                        {timetableList}
                    </div>
                    {!isVisiable ? null : (
                        <div className={styles.Modal}>
                            <div className={styles.Modal__dialog}>
                                <div className={styles.Modal__header}>
                                    <span className={styles.Modal__title}>Выберите дату</span>
                                    <span className={styles.Modal__close} onClick={onClose}>&times;</span>
                                </div>
                                <div className={styles.Modal__content}>
                                    <input type="date"></input>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </>
        )
    }
}

export default timetable;