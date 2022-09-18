import useHttp from "../hooks/useHttps";
const parameters = require('../parameters.json')
import Layout from "../components/Layout/Layout";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userFetching, userFetched, userFetchingError } from "../actions/actions";
import styles from "../styles/pages/profile.module.css"
import Spinner from "../components/major/Spinner/Spinner";

import checkLogin from "../functions/checkLogin";
import checkPermissons from "../functions/checkPermissons";

const profile = () => {
    const dispatch = useDispatch()
    const {request} = useHttp()
    const {user, userStatus} = useSelector(state => state.reducer)

    useEffect(() => {
        checkLogin();
    }, [])
    useEffect(() => {
        if (user === ''){
            dispatch(userFetching())
            request(`${parameters.API_HOST}/getuserinfo`)
                .then(response => dispatch(userFetched(response.data)))
                .catch(() => dispatch(userFetchingError()))
        }
    }, [])
    
    if (userStatus === 'loading'){
        return (
            <>
                <Layout />
                <Spinner />
            </>
        )
    }
    return (
        <> 
            <Layout></Layout>
            <div className={styles.wrapper}>
                <h3>{user.realInfo?.firstName} {user.realInfo?.secondName}</h3>
                {user?.isConfirmed ? <p className={styles.green}>Подтвержденный</p> : <p className={styles.red}>Не подтвержденный</p>} 
                {user?.accountType === "GroupHeadman" ? <p>Роль: староста</p> : <p>Роль: студент</p>}
                <p>Факультет: {user.academy?.faculty}</p>
                <p>Курс: {user.academy?.course}</p>
                <p>Группа: {user.academy?.group}</p>
                <p>Направление: {user.academy?.directionId}</p>
                <p className={styles.logout}>Выйти</p>
            </div>
        </>
    )
}

export default profile;