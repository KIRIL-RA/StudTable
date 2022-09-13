import useHttp from "../hooks/useHttps";
const parameters = require('../parameters.json')
import Layout from "../components/Layout/Layout";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userFetching, userFetched, userFetchingError } from "../actions/actions";
import styles from "../styles/pages/profile.module.css"
import Spinner from "../components/major/Spinner/Spinner";

const profile = () => {
    const dispatch = useDispatch()
    const {request} = useHttp()
    const {user, userStatus} = useSelector(state => state.reducer)

    useEffect(() => {
        if (user === ''){
            dispatch(userFetching())
            request(`${parameters.API_HOST}/getuserinfo`)
                .then(response => dispatch(userFetched(response.data)))
                .catch(() => dispatch(userFetchingError()))
        }
    }, [])

    console.log(userStatus)
    
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
                <p>{user.userName}</p>
                {user.accountType === "GroupHeadman" ? <p>Роль: староста</p> : <p>Роль: ученик</p>}
                {<p>Факультет: {user.academy?.faculty}</p>}
                {<p>Курс: {user.academy?.course}</p>}
                {<p>Группа: {user.academy?.group}</p>}
            </div>
        </>
    )
}

export default profile;