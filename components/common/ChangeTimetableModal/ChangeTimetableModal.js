import styles from "../ChangeTimetableModal/ChangeTimetableModal.module.css"

import useHttp from "../../../hooks/useHttps";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
const parameters = require('../../../parameters.json')

import { discliplinesFetching, discliplinesFetched, discliplinesFetchingError } from '../../../actions/actions'

const ChangeTimetableModal = ({ isVisiable, onClose, lessionNum, formik, specialFormik, modalType, setModalType, onDelete}) => {
    const { request } = useHttp();
    const { discliplines, timetable } = useSelector(state => state.reducer)
    const dispatch = useDispatch();
    

    
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

    let numTeacherOptions;
    Object.keys(discliplines).forEach(item => {
        if (discliplines[item].name === specialFormik.values?.numSubject) {
            numTeacherOptions = discliplines[item].teachers.map(item => {
                return <option key={item} value={item}>{item}</option>
            })
        }
    })

    let denumTeacherOptions;
    Object.keys(discliplines).forEach(item => {
        if (discliplines[item].name === specialFormik.values?.denumSubject) {
            denumTeacherOptions = discliplines[item].teachers.map(item => {
                return <option key={item} value={item}>{item}</option>
            })
        }
    })

    return !isVisiable ? null :
    (
    <div className={styles.Modal} key={lessionNum} /* onClick={onClose} */>
        <div className={styles.Modal__dialog}>
            <div className={styles.Modal__header}>
                <span className={styles.Modal__title}>Изменить пару {timetable[lessionNum].time}</span>
                <span className={styles.Modal__close} onClick={onClose}>&times;</span>
            </div>
            <div className={styles.Modal__content}>
                <div>

                    {modalType === '' ? 
                    (<div>
                        <button onClick={() => setModalType('default')} type='button'>Обычный</button>
                        <button onClick={() => setModalType('special')} type='button'>Числитель/знаменатель</button>
                        <button onClick={() => onDelete()} type='button'>Удалить пару</button>
                    </div>) : null}

                    {modalType === 'default' ? (
                        <form onSubmit={formik.handleSubmit}>
                            <select name="subject" value={formik.subject} onChange={formik.handleChange} onBlur={formik.handleBlur}>
                                <option value="">Выберите предмет</option>
                                {discliplinesOptions}
                            </select>
                            {formik.errors.subject && formik.touched.subject ? <div>{formik.errors.subject}</div> : null}

                            <select name="teacher" value={formik.values.teacher} onChange={formik.handleChange} onBlur={formik.handleBlur}>
                                <option value="">Выберите преподователя</option>
                                {teacherOptions}
                            </select>
                            {formik.errors.teacher && formik.touched.teacher ? <div>{formik.errors.teacher}</div> : null}

                            <input name="audience"  placeholder="Введите номер аудитории" value={formik.values.audience} onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
                            {formik.errors.audience && formik.touched.audience ? <div>{formik.errors.audience}</div> : null}

                            <button type='submit'>Изменить</button>
                        </form>
                    ) : null}

                    {modalType === 'special' ? (
                        <form onSubmit={specialFormik.handleSubmit}>
                            {specialFormik.errors.subject && specialFormik.touched.numSubject ? <div>{specialFormik.errors.subject}</div> : null}   

                            <span>Числитель:</span>

                            <select name="numSubject" value={specialFormik.numSubject} onChange={specialFormik.handleChange} onBlur={specialFormik.handleBlur}>
                                <option value="">Выберите предмет</option>
                                {discliplinesOptions}
                            </select>
                            
                            <select name="numTeacher" value={specialFormik.values.numTeacher} onChange={specialFormik.handleChange} onBlur={specialFormik.handleBlur}>
                                <option value="">Выберите преподователя</option>
                                {numTeacherOptions}
                            </select>
                            {specialFormik.errors.numTeacher && specialFormik.touched.numTeacher ? <div>{specialFormik.errors.numTeacher}</div> : null}

                            <input name="numAudience"  placeholder="Введите номер аудитории" value={specialFormik.values.numAudience} onChange={specialFormik.handleChange} onBlur={specialFormik.handleBlur}></input>
                            {specialFormik.errors.numAudience && specialFormik.touched.numAudience ? <div>{specialFormik.errors.numAudience}</div> : null}



                            <span>Знаменатель:</span>

                            <select name="denumSubject" value={specialFormik.denumSubject} onChange={specialFormik.handleChange} onBlur={specialFormik.handleBlur}>
                                <option value="">Выберите предмет</option>
                                {discliplinesOptions}
                            </select>

                            <select name="denumTeacher" value={specialFormik.values.denumTeacher} onChange={specialFormik.handleChange} onBlur={specialFormik.handleBlur}>
                                <option value="">Выберите преподователя</option>
                                {denumTeacherOptions}
                            </select>
                            {specialFormik.errors.denumTeacher && specialFormik.touched.denumTeacher ? <div>{specialFormik.errors.denumTeacher}</div> : null}

                            <input name="denumAudience"  placeholder="Введите номер аудитории" value={specialFormik.values.denumAudience} onChange={specialFormik.handleChange} onBlur={specialFormik.handleBlur}></input>
                            {specialFormik.errors.audience && specialFormik.touched.denumAudience ? <div>{specialFormik.errors.audience}</div> : null}

                            <button type='submit'>Изменить</button> 
                            
                        </form>
                    ) : null}
                    
                </div>
            </div>
        </div>
    </div>
    )
}

export default ChangeTimetableModal;