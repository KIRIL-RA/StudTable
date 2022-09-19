import checkLogin from "../functions/checkLogin";
import checkPermissons from "../functions/checkPermissons";
import { useEffect, useState } from "react";

import styles from "../styles/pages/confirmAccounts.module.css"
import Layout from "../components/Layout/Layout";
import useHttp from "../hooks/useHttps";
const parameters = require('../parameters.json')

import { useSelector, useDispatch } from "react-redux";
import { unconfirmedFetching, unconfirmedFetched, unconfirmedFetchingError } from "../actions/actions";

const confirmAccounts = () => {

    const {request} = useHttp();
    const dispatch = useDispatch();
    const {unconfirmed} = useSelector(state => state.reducer); 
    const [confirmed, setConfirmed] = useState([]);
 
    const onConfirm = (id) => {
        let body = {userId: id}
        request(`${parameters.API_HOST}/confirmaccount`, 'POST', JSON.stringify(body)).then(res => {
            if (res.statusCode === '100'){
                setConfirmed(confirmed => [...confirmed, id]);
            }
        }) 
    }

    useEffect(() => {
        checkLogin();
        checkPermissons();
    }, []);

    useEffect(() => {
        dispatch(unconfirmedFetching())
        request(`${parameters.API_HOST}/getunconfirmedaccounts`)
            .then(res => dispatch(unconfirmedFetched(res.data)))
            .catch(() => dispatch(unconfirmedFetchingError()))
    }, [])
    

    let unconfirmedList = unconfirmed.map(item => {
        if (confirmed?.includes(item.userId)){
            return(
                <div className={styles.list__item_confirmed} key={item.userId}>
                    <span className={styles.name}>{item.realInfo.firstName} {item.realInfo.secondName}</span>
                    <div>
                        {/* <button className={styles.decline}>Отклонить</button>
                        <button className={styles.accept}>Принять</button> */}
                    </div>
                </div>
            )
        }
        return(
            <div className={styles.list__item} key={item.userId}>
                <span className={styles.name}>{item.realInfo.firstName} {item.realInfo.secondName}</span>
                <div>
                    <button className={styles.decline}>Отклонить</button>
                    <button className={styles.accept} onClick={() =>onConfirm(item.userId)}>Принять</button>
                </div>
            </div>
        )
    })

    console.log(unconfirmedList)

    return (
        <>
            <Layout />
            <h3 className={styles.title}>Подтвердить аккаунты:</h3>
            {unconfirmedList}
        </>
    )
}

export default confirmAccounts;