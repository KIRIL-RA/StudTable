import { useFormik } from "formik"
import * as Yup from 'yup'

const registration = () => {
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
            
        }
    })
    return (
        <>
            Registration
        </>
    )
}

export default registration