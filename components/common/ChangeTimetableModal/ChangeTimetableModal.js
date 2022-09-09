import styles from "../ChangeTimetableModal/ChangeTimetableModal.module.css"

import { useFormik } from "formik";
import * as Yup from 'yup';
import useHttp from "../../../hooks/useHttps";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const parameters = require('../../../parameters.json')
const ChangeTimetableModal = ({ isVisiable, onClose}) => {
    const request = useHttp;
    const {selectedDay} = useSelector(state => state.reducer);
    /* if(isVisiable){
        return(
            <div className='Modal'>
                <div className='Modal-dialog'>
                    <div className='Modal-header'>
                        <span className='Modal-title'>Изменить расписание</span>
                        <span className='Modal-close' onClick={onClose}>&times;</span>
                    </div>
                    <div className='Modal-content'>
                        <Spinner />
                    </div>
                </div>
            </div>
        )
    } */
    useEffect(() => {
        request(`${parameters.API_HOST}/getdisciplinies`).then(res => console.log(res));
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
                    Модалка нахуй
            </div>
        </div>
    </div>
    )
}

export default ChangeTimetableModal;