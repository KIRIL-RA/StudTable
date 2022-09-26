import { useEffect } from "react";

import Link from "next/link";

import Layout from "../components/Layout/Layout";

import checkLogin from "../functions/checkLogin";

import styles from "../styles/pages/about.module.css"

const about = () => {
    useEffect(() => checkLogin(), []);

    return (
        <>
            <Layout></Layout>
            <Link href='https://vk.com/public216121694'><h1 className={styles.title}>По всем вопросам обращаться в группу ВК</h1></Link>
        </>
    )
}

export default about;