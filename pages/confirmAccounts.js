import checkLogin from "../functions/checkLogin";
import checkPermissons from "../functions/checkPermissons";
import { useEffect } from "react";

import styles from "../styles/pages/confirmAccounts.module.css"
import Layout from "../components/Layout/Layout";
import useHttp from "../hooks/useHttps";
const parameters = require('../parameters.json')

import { useSelector, useDispatch } from "react-redux";
import { unconfirmedFetching, unconfirmedFetched, unconfirmedFetchingError } from "../actions/actions";

const confirmAccounts = () => {

    const {request} = useHttp();
    const dispatch = useDispatch();
    const {unconfirmed} = useSelector(state => state.reducer)
    const onConfirm = (id) => {
        console.log(id)
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
        return(
            <div className={styles.list__item} key={item.userId}>
                <span>{item.realInfo.firstName} {item.realInfo.secondName}</span>
                <div>
                    <button>Хуйло</button>
                    <button  onClick={() =>onConfirm(item.userId)}>Принять</button>
                </div>
            </div>
        )
    })

    return (
        <>
            <Layout />
            <h3 className={styles.title}>Принять одногруппников:</h3>
            {unconfirmedList}
        </>
    )
}

export default confirmAccounts;