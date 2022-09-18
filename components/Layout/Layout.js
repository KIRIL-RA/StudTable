import Link from "next/link"
import Image from "next/image"

import styles from "./Layout.module.css"
import image1 from "../../images/toActionPage.png"
import image2 from "../../images/profile.png"
const Layout = () => {
    return(
        <div className={styles.wrapper}>
            <Link href="/actions"><a><Image className={styles.first} src={image1} width="30" height='30'/></a></Link>
            <Link href="/timetable"><span className={styles.logo}>Studtable</span></Link>
            <Link href="/profile"><a><Image className={styles.first} src={image2} width="30" height='30'/></a></Link>
        </div>
    )
}

export default Layout;