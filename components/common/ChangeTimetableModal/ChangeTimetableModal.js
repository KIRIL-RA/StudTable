import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { discliplinesFetching, discliplinesFetched, discliplinesFetchingError } from '../../../actions/actions';

import useHttp from "../../../hooks/useHttps";
const parameters = require('../../../parameters.json');

import styles from "../ChangeTimetableModal/ChangeTimetableModal.module.css";



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
    <div className={styles.Modal} key={lessionNum}>
        <div className={styles.Modal__dialog}>
            <div className={styles.Modal__header}>
                <span className={styles.Modal__title}>???????????????? ???????? {timetable[lessionNum].time}</span>
                <span className={styles.Modal__close} onClick={onClose}>&times;</span>
            </div>
            <div className={styles.Modal__content}>
                <div>

                    {modalType === '' ? 
                    (<div>
                        <button onClick={() => setModalType('default')} type='button' className={styles.functionalButton}>??????????????</button>
                        <button onClick={() => setModalType('special')} type='button' className={styles.functionalButton}>??????????????????/??????????????????????</button>
                        <button onClick={() => onDelete()} type='button' className={styles.functionalButton}>?????????????? ????????</button>
                    </div>) : null}

                    {modalType === 'default' ? (
                        <form onSubmit={formik.handleSubmit}>
                            <select className={styles.select} name="subject" onChange={formik.handleChange} onBlur={formik.handleBlur}>
                                <option value="">???????????????? ??????????????</option>
                                {discliplinesOptions}
                            </select>
                            {formik.errors.subject && formik.touched.subject ? <div>{formik.errors.subject}</div> : null}

                            <select className={styles.select} name="teacher" onChange={formik.handleChange} onBlur={formik.handleBlur}>
                                <option value="">???????????????? ??????????????????????????</option>
                                {teacherOptions}
                            </select>
                            {formik.errors.teacher && formik.touched.teacher ? <div>{formik.errors.teacher}</div> : null}

                            <select className={styles.select} name="lessionType" onChange={formik.handleChange} onBlur={formik.handleBlur}>
                                <option value="">???????????????? ?????? ??????????????</option>
                                <option value="lecture">????????????</option>
                                <option value="seminar">??????????????</option>
                                <option value="empty">???</option>
                            </select>
                            {formik.errors.lessionType && formik.touched.lessionType ? <div>{formik.errors.lessionType}</div> : null}

                            <input  className={styles.input} name="audience" maxlength='4' placeholder="?????????????? ?????????? ??????????????????" value={formik.values.audience} onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
                            {formik.errors.audience && formik.touched.audience ? <div>{formik.errors.audience}</div> : null}

                            <button type='submit' className={styles.functionalButton}>????????????????</button>
                        </form>
                    ) : null}

                    {modalType === 'special' ? (
                        <form onSubmit={specialFormik.handleSubmit}>
                            {specialFormik.errors.subject && specialFormik.touched.numSubject ? <div>{specialFormik.errors.subject}</div> : null}   

                            <span>??????????????????:</span>

                            <select className={styles.select} name="numSubject" value={specialFormik.numSubject} onChange={specialFormik.handleChange} onBlur={specialFormik.handleBlur}>
                                <option value="">???????????????? ??????????????</option>
                                {discliplinesOptions}
                            </select>
                            
                            <select className={styles.select} name="numTeacher" value={specialFormik.values.numTeacher} onChange={specialFormik.handleChange} onBlur={specialFormik.handleBlur}>
                                <option value="">???????????????? ??????????????????????????</option>
                                {numTeacherOptions}
                            </select>
                            {specialFormik.errors.numTeacher && specialFormik.touched.numTeacher ? <div>{specialFormik.errors.numTeacher}</div> : null}

                            <select className={styles.select} name="numLessionType" onChange={specialFormik.handleChange} onBlur={specialFormik.handleBlur}>
                                <option value="">???????????????? ?????? ??????????????</option>
                                <option value="lecture">????????????</option>
                                <option value="seminar">??????????????</option>
                                <option value="empty">???</option>
                            </select>
                            {specialFormik.errors.numLessionType && specialFormik.touched.numLessionType ? <div>{specialFormik.errors.numLessionType}</div> : null}

                            <input className={styles.input} name="numAudience" maxlength='4' placeholder="?????????????? ?????????? ??????????????????" value={specialFormik.values.numAudience} onChange={specialFormik.handleChange} onBlur={specialFormik.handleBlur}></input>
                            {specialFormik.errors.numAudience && specialFormik.touched.numAudience ? <div>{specialFormik.errors.numAudience}</div> : null}



                            <span>??????????????????????:</span>

                            <select className={styles.select} name="denumSubject" value={specialFormik.denumSubject} onChange={specialFormik.handleChange} onBlur={specialFormik.handleBlur}>
                                <option value="">???????????????? ??????????????</option>
                                {discliplinesOptions}
                            </select>

                            <select className={styles.select} name="denumTeacher" value={specialFormik.values.denumTeacher} onChange={specialFormik.handleChange} onBlur={specialFormik.handleBlur}>
                                <option value="">???????????????? ??????????????????????????</option>
                                {denumTeacherOptions}
                            </select>
                            {specialFormik.errors.denumTeacher && specialFormik.touched.denumTeacher ? <div>{specialFormik.errors.denumTeacher}</div> : null}

                            <select className={styles.select} name="denumLessionType" onChange={specialFormik.handleChange} onBlur={specialFormik.handleBlur}>
                                <option value="">???????????????? ?????? ??????????????</option>
                                <option value="lecture">????????????</option>
                                <option value="seminar">??????????????</option>
                                <option value="empty">???</option>
                            </select>
                            {specialFormik.errors.denumLessionType && specialFormik.touched.denumLessionType ? <div>{specialFormik.errors.denumLessionType}</div> : null}

                            <input className={styles.input} name="denumAudience" maxlength='4' placeholder="?????????????? ?????????? ??????????????????" value={specialFormik.values.denumAudience} onChange={specialFormik.handleChange} onBlur={specialFormik.handleBlur}></input>
                            {specialFormik.errors.audience && specialFormik.touched.denumAudience ? <div>{specialFormik.errors.audience}</div> : null}

                            <button type='submit' className={styles.functionalButton}>????????????????</button> 
                            
                        </form>
                    ) : null}
                    
                </div>
            </div>
        </div>
    </div>
    )
}

export default ChangeTimetableModal;