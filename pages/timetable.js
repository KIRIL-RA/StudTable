import styles from "../styles/pages/timetable.module.css"
import checkLogin from "../functions/checklogin";
import { useEffect } from "react";
import getDayString from '../functions/getDayString'
import useHttp from "../hooks/useHttps";
const parameters = require('../parameters.json')

const timetable = () => {
    const { request } = useHttp();
    useEffect(() => checkLogin(), []); 

    useEffect(() => {
        /* dispatch(timetableFetching()) */
        let body = {request: 'per', day: 'Monday'} //заменить статичную хуету на getDayString

        request(`${parameters.API_HOST}/gettable`, 'POST', JSON.stringify(body))
            .then(/* result => dispatch(timetableFetched(result.data)) */r => console.log(r))
            /* .catch(() => dispatch(timetableFetchingError())) */
    }, [/* selectedDay */])

    return (
        <>
            <header className={styles.header}>
                <h1 className={styles.header__title}>Stubtable</h1>
            </header>
            <main>
                <h2 className={styles.main__title}>Понедельник, 5 сентября</h2>
                <div className={styles.timetable__wrapper}>
                    <div className={styles.timetable__item}>
                        <div>8:00-9:35</div>
                        <div>
                            <span>Мат. Анализ</span>
                            <br></br>
                            <span>Платенова О.К.</span>
                        </div>
                        <div>436</div>
                    </div>
                    <div className={styles.timetable__item}>
                        <div>8:00-9:35</div>
                        <div>
                            <span>Мат. Анализ</span>
                            <br></br>
                            <span>Платенова О.К.</span>
                        </div>
                        <div>436</div>
                    </div>
                    <div className={styles.timetable__item}>
                        <div>8:00-9:35</div>
                        <div>
                            <span>Мат. Анализ</span>
                            <br></br>
                            <span>Платенова О.К.</span>
                        </div>
                        <div>436</div>
                    </div>
                    <a href="/profile">ZZZZZZZ </a>
                </div>
            </main>
        </>
    )
}

export default timetable;