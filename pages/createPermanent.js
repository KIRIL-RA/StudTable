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

    const validate = values => {
        const errors = {}
        if (!values.numSubject && !values.denumSubject) errors.subject = 'Выберите хотя бы один предмет!'

        if (!values.numTeacher && values.numSubject) errors.numTeacher = 'Выберите преподователя для данного предмета!'

        if (!values.denumTeacher && values.denumSubject) errors.denumTeacher = 'Выберите преподователя для данного предмета!'

        if (!values.numAudience && values.numSubject) errors.numAudience = 'Введите аудиторию!'

        if (!values.denumAudience && values.denumSubject) errors.denumAudience = 'Выберите аудиторию!'

        return errors;
    }

    const specialFormik = useFormik({
        initialValues: {
            numSubject: '',
            numTeacher: '',
            numAudience: '', 
            denumSubject: '',
            denumTeacher: '',
            denumAudience: ''
        },
        validate,
        onSubmit: values => {
            let changeObj = {};
            let type1, type2; 
            {values.numSubject && values.numTeacher && values.numAudience ? type1 = tableTypes.BY_WEEK : type1 = null}
            {values.denumSubject && values.denumTeacher && values.denumAudience ? type2 = tableTypes.BY_WEEK : type2 = null} 

            changeObj[lessionNum] = {
                numerator: {
                    lessionName: values.numSubject, 
                    teacher: values.numTeacher,
                    audience: values.numAudience,
                    type: type1
                },
                denumerator: {
                    lessionName: values.denumSubject, 
                    teacher: values.denumTeacher,
                    audience: values.denumAudience,
                    type: type2
                },
                type: 'byWeek'
            }

            setCanges(changes => ({
                ...changes, 
                ...changeObj
            }))

            specialFormik.resetForm() 

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
    const onDelete = () => {
        let deleteObj = {};
        deleteObj[lessionNum] = {
            type: null 
        }

        setCanges(changes => ({
            ...changes, 
            ...deleteObj
        }))

        onClose();
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
        if (item !== 'weekType'){
            if(changes.hasOwnProperty(item)){

                //Render from Changes for Special
                if (changes[item].type === "byWeek"){
                    console.log(changes)
                    return (
                        <div onClick={() => onOpen(i)} className={styles.changedSpecialTimetableItem__wrapper} key={timetable[item].time}>
                            <div className={styles.time__wrapper}>{timetable[item].time}</div>
                            <div className={styles.textInfo__wrapper}>
                                <div className={styles.specialTextItems__wrapper}>
                                    <span className={styles.lessionName}>{changes[item].numerator?.lessionName}</span>
                                    <br></br>
                                    <span>{changes[item].numerator?.teacher}</span>
                                </div>
                                <div className={styles.line}></div>
                                <div className={styles.specialTextItems__wrapper}>
                                    <span className={styles.lessionName}>{changes[item].denumerator?.lessionName}</span>
                                    <br></br>
                                    <span>{changes[item].denumerator?.teacher}</span>
                                </div>     
                            </div>
    
                            <div>
                                <span>{changes[item].numerator?.audience}</span> 
                                <br></br>
                                <br></br>
                                <br></br>
                                <span>{changes[item].denumerator?.audience}</span>   
                            </div>
                        </div>
                    )
                }
    
                //Render from Changes
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
            
            //Render from timetable for special
            if (timetable[item].type === "byWeek"){
                return (
                    <div onClick={() => onOpen(i)} className={styles.specialTimetableItem__wrapper} key={timetable[item].time}>
                        <div className={styles.time__wrapper}>{timetable[item].time}</div>
                        <div className={styles.textInfo__wrapper}>
                            <div className={styles.specialTextItems__wrapper}>
                                <span className={styles.lessionName}>{timetable[item].numerator.lessionName}</span>
                                <br></br>
                                <span>{timetable[item].numerator.teacher}</span>
                            </div>
                            <div className={styles.line}></div>
                            <div className={styles.specialTextItems__wrapper}>
                                <span className={styles.lessionName}>{timetable[item].denumerator.lessionName}</span>
                                <br></br>
                                <span>{timetable[item].denumerator.teacher}</span> 
                            </div>
                              
                        </div>
                        <div>
                            <span>{timetable[item].numerator.audience}</span>
                            <br></br>
                            <br></br>
                            <br></br>
                            <span>{timetable[item].denumerator.audience}</span>  
                        </div>
                    </div>
                )
            }
    
            //Render from timetable
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
        } 
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
                <ChangeTimetableModal 
                    formik={formik} 
                    specialFormik={specialFormik}

                    modalType={modalType} 
                    setModalType={setModalType} 

                    isVisiable={isVisiable} 
                    onClose = {onClose} 
                    lessionNum={lessionNum} 
                    onDelete={onDelete}/>
                    {selectedDay === '' ? null : (
                        <div className={styles.buttons__wrapper}>
                            <button onClick={onSend} className={styles.saveButton}>Сохранить</button>
                            <button onClick={onClear} className={styles.discardButton}>Отмнеить</button>
                        </div>
                    )}
            </div>
        </>
    )
}

export default createPermanent;