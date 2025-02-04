import type { AppProps } from 'next/app'
import Head from 'next/head'
import { GlobalStyle } from '../components/core/GlobalStyle'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Resumake</title>
        <meta
            name="description"
            content="Free Online Resume Builder"
          />
        <meta 
            name="keywords"
            content="resume, builder, free, online, generator, maker"
          />
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}

export default App
