import Layout from '../components/Layout/Layout'
import styles from '../styles/pages/actions.module.css'
import Link from 'next/link'
import checkLogin from '../functions/checkLogin'
import checkPermissons from '../functions/checkPermissons'
import { useEffect } from 'react'

const actions = () => {
    useEffect(() => {
        checkLogin()
        checkPermissons()
    }, []);

    return (
        <>
            <Layout />
            <h2 className={styles.title}>Что вы хотите сделать?</h2>
            <div className={styles.buttons__wrapper}>
                <Link href='/createPermanent'><button className={styles.button}>Обновить постоянное расписание</button></Link>
                <Link href='/confirmAccounts'><button className={styles.button}>Подтвердить аккаунты</button></Link>
            </div>
        </>
    )
}

export default actions;