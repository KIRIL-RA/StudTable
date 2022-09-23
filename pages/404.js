import Link from 'next/link';
import Layout from '../components/Layout/Layout';

const page404 = () => {
    return (
    <>
        <Layout></Layout>
        <div
            style={{
            marginTop: 100,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            }}>
            <h1>404</h1>
            <h2>
            <Link href="/timetable">
                <a style={{ color: 'blue', textDecoration: 'underline' }}>Вернуться к расписанию</a>
            </Link>
            </h2>
            <p>Простите, но такой страницы не существует</p>
        </div>
    </>
    );
};

export default page404;