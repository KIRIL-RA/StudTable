import Layout from '../components/Layout/Layout'
import styles from '../styles/pages/actions.module.css'
import Link from 'next/link'
import checkLogin from '../functions/checkLogin'
import { useEffect, useState } from 'react'
const parameters = require('../parameters.json')
import Spinner from "../components/major/Spinner/Spinner";
import Head from 'next/head'

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
                <Head>
                    <title>Меню</title>
                </Head>
                <Layout />
                <Spinner />
            </>
        )
    }

    return (
        <>
            <Head>
                <title>Меню</title>
            </Head>
            <Layout />
            <h2 className={styles.title}>Что вы хотите сделать?</h2>
            <div className={styles.buttons__wrapper}>
                {permissons.includes('updtt') ? <Link href='/createPermanent'><button className={styles.button}>Обновить постоянное расписание</button></Link> : null} 
                {permissons.includes('ca') ? <Link href='/confirmAccounts'><button className={styles.button}>Подтвердить аккаунты</button></Link> : null}
                <button className={styles.button}><Link href='https://vk.com/public216121694'>Группа ВК</Link></button> 
            </div>
        </>
    )
}

export default actions;