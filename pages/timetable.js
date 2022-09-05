import styles from "../styles/pages/timetable.module.css"

const timetable = () => {
    return (
        <>
            <header className={styles.header}>
                <h1 className={styles.header__title}>Stubtable</h1>
            </header>
            <main>
                <h2 className={styles.main__title}>Понедельник, 5 сентября</h2>
                <div className={styles.timetable__wrapper}>
                    <div className={styles.timetable__item}>
                        <div>8:00-9:35</div>
                        <div>
                            <span>Мат. Анализ</span>
                            <br></br>
                            <span>Платенова О.К.</span>
                        </div>
                        <div>436</div>
                    </div>
                    <div className={styles.timetable__item}>
                        <div>8:00-9:35</div>
                        <div>
                            <span>Мат. Анализ</span>
                            <br></br>
                            <span>Платенова О.К.</span>
                        </div>
                        <div>436</div>
                    </div>
                    <div className={styles.timetable__item}>
                        <div>8:00-9:35</div>
                        <div>
                            <span>Мат. Анализ</span>
                            <br></br>
                            <span>Платенова О.К.</span>
                        </div>
                        <div>436</div>
                    </div>
                    <a href="/profile">ZZZZZZZ </a>
                </div>
            </main>
        </>
    )
}

export default timetable;