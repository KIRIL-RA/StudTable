import { useFormik } from "formik"
import * as Yup from 'yup'
import { useEffect, useState } from "react"
import useHttp from "../hooks/useHttps"
const parameters = require('../parameters.json')
import styles from "../styles/pages/registration.module.css"
import Router from "next/router"

const registration = () => {
    useEffect(() => {
        fetch(`${parameters.API_HOST}/checklogin`).then(res => res.json()).then(result => result.statusCode === '100' ? Router.push('/timetable') : null)
          // eslint-disable-next-line
      },[])

    const {request} = useHttp();
    const [university, setUniversity] = useState([]);
    const [faculties, setFaculties] = useState([]);
    const [directions, setDerections] = useState([]);
    const [error, setError] = useState('');

    const formik = useFormik({
        initialValues:{
            username: '', 
            email: '', 
            password: '',
            confirmPassword: '', 
            accountType: '', 
            firstName: '',
            secondName: '', 
            lastName: '',
            academy: '', 
            faculty: '', 
            direction: '', 
            groupe: '', 
            course: '', 
            studentIdNumber: ''
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Введите имя пользователя!'),
            email: Yup.string().required('Введите почту!'),
            password: Yup.string().required('Введите пароль!'), 
            confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Пароль должен совпадать!').required('Подтвердите пароль!'),
            accountType: Yup.string().required('Выберете тип аккаунта!'), 
            firstName: Yup.string().required('Введите имя!'),
            secondName: Yup.string().required('Введите фамилию!'),
            lastName: Yup.string().required('Введите отчество!'),
            academy: Yup.string().required('Выберете университет!'), 
            faculty: Yup.string().required('Выберете факультет!'), 
            direction: Yup.string().required('Выберете направление!'), 
            groupe: Yup.string().required('Введите группу!'), 
            course: Yup.string().required('Выберете курс!'), 
            studentIdNumber: Yup.string().required('Введите номер студенческого!')
        }),

        onSubmit: values => {
            let registrationInfo = {
                userName: formik.values.username, 
                email: formik.values.email,
                password: formik.values.password,
                accountType: formik.values.accountType,
                academyInfo: {
                    id: formik.values.academy,
                    directionId: formik.values.direction,
                    group: formik.values.groupe,
                    faculty: formik.values.faculty,
                    course: formik.values.course,
                    studentIdNumber: formik.values.studentIdNumber
                },
                realInfo: {
                    firstName: formik.values.firstName,
                    secondName: formik.values.secondName,
                    lastName: formik.values.lastName
                }
            }

            request(`${parameters.API_HOST}/registryuser`, 'POST', JSON.stringify(registrationInfo))
                .then(res => {
                    if (res.statusCode === '100'){
                        Router.push('/login')
                    } else { 
                        setError(res.Status)
                    }
                })

            } 
    })

    useEffect(() => {
        let body = {
            request: 'ga'
        }
        request(`${parameters.API_HOST}/getacademyinfo`, 'POST', JSON.stringify(body))
            .then(res => setUniversity(res.data))
    }, [])

    
    useEffect(() => {
        if (formik.values.academy){
            let body = {
                request: 'gf', 
                academyId: formik.values.academy
            }
            request(`${parameters.API_HOST}/getacademyinfo`, 'POST', JSON.stringify(body))
            .then(res => setFaculties(res.data))
        }
    }, [formik.values.academy])

    useEffect(() => {
        if (formik.values.academy && formik.values.faculty){
            let body = {
                request: 'gd', 
                academyId: formik.values.academy,
                faculty: formik.values.faculty
            }
            request(`${parameters.API_HOST}/getacademyinfo`, 'POST', JSON.stringify(body))
            .then(res => setDerections(res.data))
        }
    }, [formik.values.faculty])

    let universityList = university.map(item => {
        return(
            <option value={item.id} key={item.id}>{item.name}</option>
        )
    })

    let facultiesList = Object.keys(faculties).map(item => {
        return(
            <option value={item} key={item}>{faculties[item]?.name}</option>
        )
    })

    let derectionList = Object.keys(directions).map(item => {
        return(
            <option value={item} key={item}>{directions[item]?.name}</option>
        )
    })

    return (
        <div className={styles.pageWrapper}>
            <h1>Добро пожаловать в Studtable!</h1>
            <h3>Пройдите регистрацию перед началом</h3>
            {error ? <div className={styles.error}>{error}</div> : null}
            <form onSubmit={formik.handleSubmit} className={styles.formWrapper}>

                <input className={styles.input} name="username" placeholder="Логин" onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
                {formik.errors.username && formik.touched.username ? <div className={styles.error}>{formik.errors.username}</div> : null}

                <input className={styles.input} name="email" placeholder="Почта" onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
                {formik.errors.email && formik.touched.email ? <div className={styles.error}>{formik.errors.email}</div> : null}

                <input className={styles.input} name="password" placeholder="Пароль" onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
                {formik.errors.password && formik.touched.password ? <div className={styles.error}>{formik.errors.password}</div> : null}

                <input className={styles.input} name="confirmPassword" placeholder="Подтвердите пароль" onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
                {formik.errors.confirmPassword && formik.touched.confirmPassword ? <div className={styles.error}>{formik.errors.confirmPassword}</div> : null}

                <select className={styles.select} name="accountType" onChange={formik.handleChange} onBlur={formik.handleBlur}>
                    <option value="">Выберите тип аккаунта</option>
                    <option value="Student">Студент</option>
                    <option value="GroupHeadman">Староста</option>
                </select>
                {formik.errors.accountType && formik.touched.accountType ? <div className={styles.error}>{formik.errors.accountType}</div> : null}

                <input className={styles.input} name="firstName" placeholder="Имя" onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
                {formik.errors.firstName && formik.touched.firstName ? <div className={styles.error}>{formik.errors.firstName}</div> : null}

                <input className={styles.input} name="secondName" placeholder="Фамилия" onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
                {formik.errors.secondName && formik.touched.secondName ? <div className={styles.error}>{formik.errors.secondName}</div> : null}

                <input className={styles.input} name="lastName" placeholder="Отчество" onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
                {formik.errors.lastName && formik.touched.lastName ? <div className={styles.error}>{formik.errors.lastName}</div> : null}

                <select className={styles.select} name="academy" onChange={formik.handleChange} onBlur={formik.handleBlur}> 
                    <option value="">Выберите университет</option>
                    {universityList}
                </select>
                {formik.errors.academy && formik.touched.academy ? <div className={styles.error}>{formik.errors.academy}</div> : null}

                {formik.values.academy ? (
                    <>
                        <select className={styles.select} name="faculty" onChange={formik.handleChange} onBlur={formik.handleBlur}>
                            <option value="">Выберите факультет</option>
                            {facultiesList}
                        </select>
                        {formik.errors.faculty && formik.touched.faculty ? <div className={styles.error}>{formik.errors.faculty}</div> : null}
                    </>
                ) : null}

                {formik.values.faculty ? (
                    <>
                        <select className={styles.select} name="direction" onChange={formik.handleChange} onBlur={formik.handleBlur}>
                            <option value="">Выберите направление</option>
                            {derectionList}
                        </select>
                        {formik.errors.direction && formik.touched.direction ? <div className={styles.error}>{formik.errors.direction}</div> : null}
                    </> 
                ) : null}

                {formik.values.direction ? (
                    <>
                        <input name="groupe" className={styles.input} placeholder="Группа" onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
                        {formik.errors.groupe && formik.touched.groupe ? <div className={styles.error}>{formik.errors.groupe}</div> : null}

                        <select className={styles.select} name="course" onChange={formik.handleChange} onBlur={formik.handleBlur}>
                            <option value="">Выберите курс</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                        {formik.errors.course && formik.touched.course ? <div className={styles.error}>{formik.errors.course}</div> : null}

                        <input className={styles.input} name="studentIdNumber" placeholder="Номер студенческого" onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
                        {formik.errors.studentIdNumber && formik.touched.studentIdNumber ? <div className={styles.error}>{formik.errors.studentIdNumber}</div> : null}         
                    </>
                ) : null}

                <button type="submit" className={styles.button}>Подтвердить</button>
            </form>
        </div>
    )
}

export default registration