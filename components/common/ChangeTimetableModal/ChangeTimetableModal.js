import styles from "../ChangeTimetableModal/ChangeTimetableModal.module.css"

import { useFormik } from "formik";
import * as Yup from 'yup';
import useHttp from "../../../hooks/useHttps";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
const parameters = require('../../../parameters.json')
const tableTypes = require('../../../pages/static/TableTypes.json')
import { discliplinesFetching, discliplinesFetched, discliplinesFetchingError, timetableFetching, timetableFetched, timetableFetchingError } from '../../../actions/actions'

const ChangeTimetableModal = ({ isVisiable, onClose, lessionNum, fetchTimetable}) => {
    const { request } = useHttp();
    const {discliplines} = useSelector(state => state.reducer)
    const { selectedDay } = useSelector(state => state.reducer);
    const dispatch = useDispatch();

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
            let body = {day: selectedDay, 
                type: tableTypes.PERMANENT, 
                changes: {}
            }
            body.changes[lessionNum] = {
                audience: values.audience,
                lessionName: values.subject, 
                teacher: values.teacher,
                type: tableTypes.PERMANENT
            }

            request(`${parameters.API_HOST}/updatetable`, 'POST', JSON.stringify(body))
                .then(() => onClose()) 
                .then(() => fetchTimetable())
            formik.values.subject = ''
            formik.values.teacher = ''
            formik.values.audience = ''
        }
    })  	    

    useEffect(() => {
        if (isVisiable && discliplines === ''){
            dispatch(discliplinesFetching())

            request(`${parameters.API_HOST}/getdisciplinies`)
                .then(result => dispatch(discliplinesFetched(result.data)))
                .catch(() => dispatch(discliplinesFetchingError()));
        }
    }, [isVisiable, discliplines])
    
    let discliplinesOptions = Object.keys(discliplines).map((item) => {
        return (
            <option key={discliplines[item].name} value={discliplines[item].name}>{discliplines[item].name}</option>
        )
    })

    let teacherOptions;
    Object.keys(discliplines).forEach(item => {
        if (discliplines[item].name === formik.values?.subject) {
            teacherOptions = discliplines[item].teachers.map(item => {
                return <option key={item} value={item}>{item}</option>
            })
        }
    })

    return !isVisiable ? null :
    (
    <div className={styles.Modal} /* onClick={onClose} */>
        <div className={styles.Modal__dialog}>
            <div className={styles.Modal__header}>
                <span className={styles.Modal__title}>Изменить расписание</span>
                <span className={styles.Modal__close} onClick={onClose}>&times;</span>
            </div>
            <div className={styles.Modal__content}>
                <form onSubmit={formik.handleSubmit}>

                    <select name="subject" value={formik.subject} onChange={formik.handleChange} onBlur={formik.handleBlur}>
                        <option value="">Выберите предмет</option>
                        {discliplinesOptions}
                    </select>

                    {formik.values.subject ? (
                        <select name="teacher" value={formik.values.teacher} onChange={formik.handleChange} onBlur={formik.handleBlur}>
                            <option value="">Выберите преподователя</option>
                            {teacherOptions}
                        </select>
                    ) : null}

                    {formik.values.subject && formik.values.teacher ? (
                        <input name="audience"  placeholder="Введите номер аудитории" value={formik.values.audience} onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
                    ) : null}

                    {formik.values.subject && formik.values.teacher && formik.values.audience ? (
                        <button type='submit'>Изменить</button>
                    ) : null}
                </form>
            </div>
        </div>
    </div>
    )
}

export default ChangeTimetableModal;