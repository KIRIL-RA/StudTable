import '../styles/globals.css'
import Head from 'next/head'
import store from '../store'
import { Provider } from 'react-redux'
function MyApp({ Component, pageProps }) {
  return (
    <>
    <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Inter&family=KoHo&display=swap" rel="stylesheet" />
    </Head>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
    </>
  )
}

export default MyApp
