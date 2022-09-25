import Image from "next/image";
import errorPng from '../../..//images/error.png'
import styles from "./Error.module.css"

const Error = () => {
    return (
        <>
            <div className={styles.wrapper}>
                <Image src={errorPng} width={170} height={170} className={styles.icon}></Image>
            </div>
            <p className={styles.text}>Произошла ошибка, перезагрузите страницу</p>
        </> 
    )
}

export default Error;