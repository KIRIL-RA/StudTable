import Image from "next/image"
import spinerSVG from "../../../images/loading.svg"
import styles from "./Spinner.module.css"

const Spinner = () => {
    return (
        <div className={styles.wrapper}>
            <Image src={spinerSVG} width={170} height={170}></Image>
        </div>
        
    )
}

export default Spinner;