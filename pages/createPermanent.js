import DaySelector from "../components/common/DaySelector/DaySelector";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const parameters = require('../parameters.json')
import { timetableFetching, timetableFetched, timetableFetchingError, setSelectedDay } from "../actions/actions";
import checkLogin from "../functions/checklogin";
import ChangeTimetableModal from "../components/common/ChangeTimetableModal/ChangeTimetableModal";
import useHttp from "../hooks/useHttps";
import styles from "../styles/pages/createPermanent.module.css"
import Layout from "../components/Layout/Layout";
import checkPermissons from "../functions/checkPermissons"
import Spinner from "../components/major/Spinner/Spinner";
import { useFormik } from "formik";
import * as Yup from 'yup';
const tableTypes = require('../pages/static/TableTypes.json')


const createPermanent = () => {



    const [isVisiable, setIsVisiable] = useState(false);
    const [lessionNum, setLessionNum] = useState();
    const {selectedDay, timetable, timetableStatus} = useSelector(state => state.reducer);
    const dispatch = useDispatch();
    const [changes, setCanges] = useState({});
    const [modalType, setModalType] = useState('');


    const formik =  useFormik({
        initialValues: {
            subject: '', 
            teacher: '',
            audience: '' 
        },
        validationSchema: Yup.object({
            subject: Yup.string().required('Выберите предмет!'),
            teacher: Yup.string().required('Выберите преподавателя!'),
            audience: Yup.string().required('Введите аудиторию!')
        }), 
        onSubmit: values => {
            let changeObj = {};
            changeObj[lessionNum] = {
                audience: values.audience,
                lessionName: values.subject, 
                teacher: values.teacher,
                type: tableTypes.PERMANENT  
            }

            setCanges(changes => ({
                ...changes, 
                ...changeObj
            }))

            formik.values.subject = ''
            formik.values.teacher = ''
            formik.values.audience = ''

            onClose();
        }
       

    })  	 


    const onClear = () => {
        setCanges({});
    }
    const onSend = () => {
        let body = {
            day: selectedDay,
            type: tableTypes.PERMANENT, 
            changes: changes
        }
        request(`${parameters.API_HOST}/updatetable`, 'POST', JSON.stringify(body))
                .then((result) => {
                        setCanges({});
                        fetchTimetable();
                })/* .catch(() => ) */
    }

    const onOpen = (i) => {
        setIsVisiable(true)
        setLessionNum(i)
    }
    const onClose = () => {
        setIsVisiable(false)
        formik.resetForm() 
        setModalType('')
    };

    const { request } = useHttp();

    const fetchTimetable = () => {
        dispatch(timetableFetching())
        let body = {request: 'per', day: selectedDay}

        request(`${parameters.API_HOST}/gettable`, 'POST', JSON.stringify(body))
            .then(result => dispatch(timetableFetched(result.data)))
            .catch(() => dispatch(timetableFetchingError()))
    }
    useEffect(() => {
        checkLogin()
        checkPermissons()
    }, []); 

    useEffect(() => {
        if (selectedDay !== ''){
            fetchTimetable()
        }
    }, [selectedDay])
    
    let timetableList = Object.keys(timetable).map((item, i) => {

        if(changes.hasOwnProperty(item)){
            return(
                <div key={i} onClick={() => onOpen(i)} className={styles.changedTimetableItem__wrapper}>
                    <div className={styles.time__wrapper}>{timetable[item].time}</div>
                    <div className={styles.textItems__wrapper}>
                        <span className={styles.lessionName}>{changes[item].lessionName}</span>
                        <br></br>
                        <span>{changes[item].teacher}</span>
                    </div>
                    <div>{changes[item].audience}</div>
                    {changes[item].type === null ? <p></p> : null}
                </div>
            )
        }

        return (
            <div key={i} onClick={() => onOpen(i)} className={styles.timetableItem__wrapper}>
                <div className={styles.time__wrapper}>{timetable[item].time}</div>
                <div className={styles.textItems__wrapper}>
                    <span className={styles.lessionName}>{timetable[item].lessionName}</span>
                    <br></br>
                    <span>{timetable[item].teacher}</span>
                </div>
                <div>{timetable[item].audience}</div>
                {timetable[item].type === null ? <p></p> : null}
            </div>
        )
    })

    if(timetableStatus === 'loading'){
        return (
            <>
                <Layout></Layout>
                <h3 className={styles.createPermanent__title}>Обновление расписания:</h3>
                <DaySelector />
                <Spinner></Spinner>
            </>
        )
    }

    return (
        <>
            <Layout></Layout>
            <div>
                <h3 className={styles.createPermanent__title}>Обновление расписания:</h3>
                <DaySelector />
                {timetableList}
                <ChangeTimetableModal setModalType={setModalType} modalType={modalType} formik={formik} isVisiable={isVisiable} onClose = {onClose} lessionNum={lessionNum} fetchTimetable={fetchTimetable}></ChangeTimetableModal>
                <div>
                    <button onClick={onSend}>Сохранить</button>
                    <button onClick={onClear}>Отмнеить</button>
                </div>
            </div>
        </>
    )
}

export default createPermanent;