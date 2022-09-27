import styles from './TimetableItem.module.css'

const getLessionType = (type) => {
    switch (type){
        case 'lecture':
            return <span className={styles.lessionType}>(Лекция)</span>
        case 'seminar':
            return <span className={styles.lessionType}>(Семинар)</span>
        case 'empty':
            return <span className={styles.lessionType}>—</span>
        default:
            return null
    }
}

const TimetableItem = ({ time, name, type, teacher, audience, dayType }) => { 
    return (
        <div className={styles.wrapper} key={name}>
            <div className={styles.time}>{time}</div>
            <div className={styles.textBlock}>
                    <span className={styles.lessionName}>{name} </span>
                    <br></br>
                    {getLessionType(type)}
                    <br></br>
                    <span>{teacher}</span>
            </div>
            <div className={styles.audience}>{audience}</div>
            {dayType === null ? <p></p> : null}
        </div>
    )
}

export default TimetableItem;