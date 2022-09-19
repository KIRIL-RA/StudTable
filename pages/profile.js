import useHttp from "../hooks/useHttps";
const parameters = require('../parameters.json')
import Layout from "../components/Layout/Layout";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userFetching, userFetched, userFetchingError } from "../actions/actions";
import styles from "../styles/pages/profile.module.css"
import Spinner from "../components/major/Spinner/Spinner";
import Link from "next/link";

import checkLogin from "../functions/checkLogin";

const profile = () => {
    const dispatch = useDispatch()
    const {request} = useHttp()
    const {user, userStatus} = useSelector(state => state.reducer)

    const logOut = () => {
        request(`${parameters.API_HOST}/exitaccount`)
    }

    useEffect(() => {
        checkLogin();
    }, [])

    useEffect(() => {
        if (user === ''){
            dispatch(userFetching())
            request(`${parameters.API_HOST}/getuserinfo`)
                .then(response => response.statusCode === '100' ? dispatch(userFetched(response.data)) : dispatch(userFetchingError()))
                .catch(() => dispatch(userFetchingError()))
        }
    }, [])
    
    if (userStatus === 'loading' || user === ''){
        return (
            <>
                <Layout />
                <Spinner />
            </>
        )
    }
    
    if (userStatus === 'idle'){
        return (
            <> 
                <Layout></Layout>
                <div className={styles.wrapper}>
                    <h3>{user?.realInfo?.firstName} {user?.realInfo?.secondName}</h3>
                    {user?.isConfirmed ? <p className={styles.green}>Подтвержденный</p> : <p className={styles.red}>Не подтвержденный</p>} 
                    {user?.accountType === "GroupHeadman" ? <p>Роль: староста</p> : <p>Роль: студент</p>}
                    <p>Факультет: {user?.academy?.faculty}</p>
                    <p>Курс: {user?.academy?.course}</p>
                    <p>Группа: {user?.academy?.group}</p>
                    <p>Направление: {user?.academy?.directionId}</p>
                    <Link href='/login'><p className={styles.logout} onClick={logOut}>Выйти</p></Link>
                </div>
            </>
        )
    }
}

export default profile;