import Link from "next/link"
import Image from "next/image"

import styles from "./Layout.module.css"
import image from "../../images/toActionPage.svg"
const Layout = () => {
    return(
        <div className={styles.wrapper}>
            <Link href="/actions"><a><Image className={styles.first} src={image} width="30" height='30'/></a></Link>
            <Link href="/timetable"><span className={styles.logo}>Stubtable</span></Link>
            <Link href="/profile"><span className={styles.third}>Кирилл</span></Link>
        </div>
    )
}

export default Layout;