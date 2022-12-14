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
import TimetableItem from "../components/common/TimetableItem/TimetableItem";

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

    let timetableList = Object.keys(timetable).map(item => {  //?????? ???????? ???????????????? if (timetable), ???????? ???????????????? ????????, ???? ???????? ??????
            if (item !== 'weekType'){                         //?????? ?????? ???? ???????????? ???????????????? ???? ???????????? ????????????????????, ???? ?? ????????/????????, ?????????? ???????????????? ???????????????? ??????????
                {timetable[item].type === "byWeek" ? 
                    <TimetableItem 
                    time={timetable[item].time} 
                    name={timetable[item][typeOfWeek]?.lessionName} 
                    type={timetable[item][typeOfWeek]?.lessionType} 
                    teacher={timetable[item][typeOfWeek]?.teacher} 
                    audience={timetable[item][typeOfWeek]?.audience} 
                    dayType={timetable[item][typeOfWeek]?.type}/> : null}
                return <TimetableItem 
                        time={timetable[item]?.time} 
                        name={timetable[item]?.lessionName} 
                        type={timetable[item]?.lessionType} 
                        teacher={timetable[item]?.teacher} 
                        audience={timetable[item]?.audience} 
                        dayType={timetable[item].type}/>
                
            }
        })

    if(timetableStatus === 'loading'){
        return (
            <>
                <Head>
                    <title>????????????????????</title>
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
                    <title>????????????????????</title>
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
                    <title>????????????????????</title>
                </Head>
                <Layout></Layout>
                <main>
                    <div className={styles.dayInfo}>
                        {!day ? <span className={styles.main__title} onClick={onOpen}>{getCurrentDate(new Date())}</span> : <h2 className={styles.main__title} onClick={onOpen}>{getCurrentDate(parceDate(day, 'default'))}</h2>}
                        {timetable?.weekType === 'numerator' ? <span className={styles.weekType}>??????????????????</span> : <span className={styles.weekType}>??????????????????????</span>}
                    </div>
                    <div className={styles.timetable__wrapper}>
                        {timetableList}
                    </div>
                    {!isVisiable ? null : (
                        <div className={styles.Modal}>
                            <div className={styles.Modal__dialog}>
                                <div className={styles.Modal__header}>
                                    <span className={styles.Modal__title}>???????????????? ????????</span>
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