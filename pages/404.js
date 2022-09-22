import Link from 'next/link';

const page404 = () => {
    return (
    <div
        style={{
        marginTop: 100,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        }}>
        <h2>
        <Link href="/timetable">
            <a style={{ color: 'blue', textDecoration: 'underline' }}>Вернуться к расписанию</a>
        </Link>
        </h2>
        <p>Простите, но такой страницы не существует</p>
    </div>
    );
};

export default page404;