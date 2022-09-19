import Layout from '../components/Layout/Layout'
import styles from '../styles/pages/actions.module.css'
import Link from 'next/link'
import checkLogin from '../functions/checkLogin'
import { useEffect, useState } from 'react'
const parameters = require('../parameters.json')
import Spinner from "../components/major/Spinner/Spinner";

//ToDo переписать на редакс checkPermisson и данную страницу
const actions = () => {
    const [permissons, setPermissons] = useState('');
    useEffect(() => {
        checkLogin()
    }, []);

    useEffect(() => {
        fetch(`${parameters.API_HOST}/getspecificpermissions`).then(response => response.json()).then(response => {
            setPermissons(response.data)
        })
    }, [])

    if (permissons === ''){
        return(
            <> 
                <Layout />
                <Spinner />
            </>
        )
    }

    return (
        <>
            <Layout />
            <h2 className={styles.title}>Что вы хотите сделать?</h2>
            <div className={styles.buttons__wrapper}>
                {permissons.includes('updtt') ? <Link href='/createPermanent'><button className={styles.button}>Обновить постоянное расписание</button></Link> : null} 
                {permissons.includes('ca') ? <Link href='/confirmAccounts'><button className={styles.button}>Подтвердить аккаунты</button></Link> : null}
                {permissons.length === 0 ? <h3>Для вас тут ничего нет... Пока что</h3> : null}
            </div>
        </>
    )
}

export default actions;