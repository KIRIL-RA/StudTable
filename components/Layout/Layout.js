import Link from "next/link"

import styles from "./Layout.module.css"

import { AiOutlineUnorderedList, AiOutlineUser} from "react-icons/ai";

const Layout = () => {
    return(
        <div className={styles.wrapper}>
            <Link href="/actions"><AiOutlineUnorderedList size={32}/></Link>
            <Link href="/timetable"><span className={styles.logo}>Studtable</span></Link>
            <Link href="/profile"><AiOutlineUser size={32}/></Link>
        </div>
    )
}

export default Layout;