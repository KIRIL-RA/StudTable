import Link from "next/link"

import styles from "./Layout.module.css"

import { AiOutlineUnorderedList, AiOutlineUser} from "react-icons/ai";

const Layout = () => {
    return(
        <div className={styles.wrapper}>
            <Link href="/actions"><a><AiOutlineUnorderedList size={32}/></a></Link>
            <Link href="/timetable"><a><span className={styles.logo}>Studtable</span></a></Link>
            <Link href="/profile"><a><AiOutlineUser size={32}/></a></Link>
        </div>
    )
}

export default Layout;