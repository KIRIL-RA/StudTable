import { useFormik } from 'formik'
import * as Yup from 'yup';
import Router from 'next/router';
import { useState, useEffect } from 'react';
const parameters = require('../parameters.json')
import styles from '../styles/pages/login.module.css'

const login = () => {
    const [serverError, setServerError] = useState('');

    useEffect(() => {
        fetch(`${parameters.API_HOST}/checklogin`).then(res => res.json()).then(result => result.statusCode === '100' ? Router.push('/timetable') : null)
          // eslint-disable-next-line
      },[])

    const formik = useFormik({
        initialValues: {
            username: '', 
            password: ''
        }, 
        validationSchema: Yup.object({
            username: Yup.string().required('Обязательное поле!'), 
            password: Yup.string().required('Обязательное поле!')
        }), 
        onSubmit: values => {
            let body = `/login?username=${values.username}&password=${values.password}`;

            fetch(`${parameters.API_HOST}${body}`)
                .then(res => res.json())
                .then(result => {
                    if (result.statusCode === '100') Router.push('/timetable');
                    if (result.statusCode === '110') setServerError('Неправильное имя пользователя или пароль');
                    if (result.statusCode !== '100' && result.statusCode !== '110') setServerError('Что-то не так, перезагрузите страницу');
                })
        }
    })

    useEffect(() => {
        if (formik.touched.username || formik.touched.password) setServerError('');
    }, [formik.values.username, formik.values.password])

    return(
        <div className={styles.login__wrapper}>
            <h1 className={styles.login__title}>StubTable!</h1>
            <form onSubmit={formik.handleSubmit} className={styles.form__wrapper}>
                <input className={styles.form__input} type="text" value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur} name="username" placeholder='Имя пользователя'></input>
                {formik.errors.username && formik.touched.username ? <div className={styles.form__error}>{formik.errors.username}</div> : null}

                <input className={styles.form__input} type="text" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} name="password" placeholder='Пароль'/>
                {formik.errors.password && formik.touched.password ? <div className={styles.form__error}>{formik.errors.password}</div> : null}

                {serverError !== '' ? <div className={styles.form__error}>{serverError}</div> : null}
                <button type="submit" className={styles.form__button}>Войти</button>
            </form>
        </div>
    )
}

export default login;