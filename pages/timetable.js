import styles from "../styles/pages/timetable.module.css"
import checkLogin from "../functions/checkLogin";
import { useEffect, useState } from "react";
import useHttp from "../hooks/useHttps";
const parameters = require('../parameters.json')
import getCurrentDate from "../functions/getCurrentDate";
import { useSelector, useDispatch } from "react-redux";
import { timetableFetching, timetableFetched, timetableFetchingError} from '../actions/actions'
import Layout from "../components/Layout/Layout";
import Spinner from "../components/major/Spinner/Spinner";
import parceDate from "../functions/parceDate";
import Router from "next/router";
import Error from "../components/major/Error/Error";
import Head from "next/head";

const timetable = () => {
    const [day, setDay] = useState(new Date().toLocaleDateString('en-ca'));
    const { request } = useHttp();
    const dispatch = useDispatch();
    useEffect(() => checkLogin(), []); 
    const [typeOfWeek, setTypeOfWeek] = useState('');
    const [isVisiable, setIsVisiable] = useState(false);

    const handleDateUpdate = (e) => {
        setDay(e.target.value);
        onClose();
    }

    useEffect(() => {
            
            dispatch(timetableFetching())
            let dateArray = String(day).split('-').reverse().join('.')
            let body = {
                day: dateArray,
                request: 'asd'
            }
            request(`${parameters.API_HOST}/gettable`, 'POST', JSON.stringify(body))
                .then(result => {
                    if (result.statusCode === '100'){
                        dispatch(timetableFetched(result.data))
                        setTypeOfWeek(result.data.weekType)
                    }
                    if (result.statusCode === '90'){
                        Router.push('/profile')
                    }
                })
                .catch(() => dispatch(timetableFetchingError()))
    }, [day])
    const onOpen = () => setIsVisiable(true);
    const onClose = () => setIsVisiable(false);

    const {timetable, timetableStatus} = useSelector(state => state.reducer)


    let timetableList;
    if (timetable){
        timetableList = Object.keys(timetable).map(item => {
            if (item !== 'weekType'){
                if (timetable[item].type === "byWeek"){
                    return (
                        <div className={styles.timetable__item} key={timetable[item].time}>
                            <div className={styles.time__wrapper}>{timetable[item].time}</div>
                            <div className={styles.textInfo__wrapper}>
                                    <span className={styles.lessionName}>{timetable[item][typeOfWeek]?.lessionName} </span>
                                    <br></br>
                                    <span className={styles.lessionType}>{timetable[item][typeOfWeek]?.lessionType === 'lecture' ? '(Лекция)' : null}</span>
                                    <span className={styles.lessionType}>{timetable[item][typeOfWeek]?.lessionType === 'seminar' ? '(Семинар)' : null}</span>
                                    <span className={styles.lessionType}>{timetable[item][typeOfWeek]?.lessionType === 'empty' ? '—' : null}</span>
                                    <br></br>
                                    <span>{timetable[item][typeOfWeek]?.teacher}</span>
                            </div>
                            <div className={styles.audience__wrapper}>{timetable[item][typeOfWeek]?.audience}</div>
                            {timetable[item][typeOfWeek]?.type === null ? <p></p> : null}
                        </div>
                    )
                }
                return (
                    <div className={styles.timetable__item} key={timetable[item].time}>
                        <div className={styles.time__wrapper}>{timetable[item].time}</div>
                        <div className={styles.textInfo__wrapper}>
                            <span className={styles.lessionName}>{timetable[item].lessionName}</span>
                            <br></br>
                            <span className={styles.lessionType}>{timetable[item]?.lessionType === 'lecture' ? '(Лекция)' : null}</span>
                            <span className={styles.lessionType}>{timetable[item]?.lessionType === 'seminar' ? '(Семинар)' : null}</span>
                            <span className={styles.lessionType}>{timetable[item].lessionType === 'empty' ? '—' : null}</span>
                            <br></br>
                            <span>{timetable[item].teacher}</span>
                        </div>
                        <div className={styles.audience__wrapper}>{timetable[item].audience}</div>
                        {timetable[item].type === null ? <p></p> : null}
                    </div>
                )
            }
        }) 
    }

    if(timetableStatus === 'loading'){
        return (
            <>
                <Head>
                    <title>Расписание</title>
                </Head>
                <Layout></Layout>
                <Spinner></Spinner>
            </>
        )
    }

    if (timetableStatus === 'error'){
        return (
            <>
                <Head>
                    <title>Расписание</title>
                </Head>
                <Layout></Layout>
                <Error></Error>
            </>
        )
    }


    if(timetableStatus === 'idle'){
        return (
            <> 
                <Head>
                    <title>Расписание</title>
                </Head>
                <Layout></Layout>
                <main>
                    <div className={styles.dayInfo}>
                        {!day ? <span className={styles.main__title} onClick={onOpen}>{getCurrentDate(new Date())}</span> : <h2 className={styles.main__title} onClick={onOpen}>{getCurrentDate(parceDate(day, 'default'))}</h2>}
                        {timetable?.weekType === 'numerator' ? <span className={styles.weekType}>Числитель</span> : <span className={styles.weekType}>Знаменатель</span>}
                    </div>
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
                                    <input type="date" value={day} onChange={e => handleDateUpdate(e)}></input>
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