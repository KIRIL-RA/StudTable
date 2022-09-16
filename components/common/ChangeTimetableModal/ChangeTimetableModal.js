import styles from "../ChangeTimetableModal/ChangeTimetableModal.module.css"

import useHttp from "../../../hooks/useHttps";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
const parameters = require('../../../parameters.json')

import { discliplinesFetching, discliplinesFetched, discliplinesFetchingError } from '../../../actions/actions'

const ChangeTimetableModal = ({ isVisiable, onClose, lessionNum, formik, modalType, setModalType}) => {
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

    return !isVisiable ? null :
    (
    <div className={styles.Modal} key={lessionNum} /* onClick={onClose} */>
        <div className={styles.Modal__dialog}>
            <div className={styles.Modal__header}>
                <span className={styles.Modal__title}>Изменить пару {timetable[lessionNum].time}</span>
                <span className={styles.Modal__close} onClick={onClose}>&times;</span>
            </div>
            <div className={styles.Modal__content}>
                <form onSubmit={formik.handleSubmit}>

                    <div>
                        <button onClick={() => setModalType('default')} type='button'>Обычный</button>
                        <button onClick={() => setModalType('special') }type='button'>Числитель/знаменатель</button>
                    </div>

                    {modalType === 'default' ? (
                        <>
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
                        </>
                    ) : null}

                    {modalType === 'special' ? (
                        <>
                            Spicial from 
                        </>
                    ) : null}
                    
                </form>
            </div>
        </div>
    </div>
    )
}

export default ChangeTimetableModal;