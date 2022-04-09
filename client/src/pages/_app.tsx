import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { AnimatePresence, motion } from 'framer-motion'
import { AppProps } from 'next/dist/shared/lib/router/router'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from '../assets/styles/globals'
import muiTheme from '../assets/styles/muiTheme'
import { appTheme } from '../assets/styles/theme'
import { socketContext } from '../lib/context/socketContext'
import socket from '../lib/services/sockets'
import store from '../store'
import AnimatedLogo from '../components/global/AnimatedLogo'
import styled from 'styled-components'

const Loading = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    router.events.on('routeChangeStart', () => setIsLoading(true))
    router.events.on('routeChangeComplete', () => {
      setIsLoading(false)
    })

    return () => {
      router.events.off('routeChangeStart', () => setIsLoading(true))
      router.events.off('routeChangeComplete', () => {
        setIsLoading(false)
      })
    }
  }, [])

  return (
    <>
      <Head>
        <title>Safe talk</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="rgb(101, 41, 138, 0.90)" />
        <meta
          name="description"
          content="Chat to talk with confidentiality, all messages are missed after close the app."
        />
        <link rel="shortcut icon" href="/static/images/appLogo.svg" />
        <link rel="icon" href="/static/images/appLogo.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <GlobalStyle />
      <MuiThemeProvider theme={muiTheme}>
        <ThemeProvider theme={appTheme}>
          <Provider store={store}>
            <socketContext.Provider value={socket}>
              <AnimatePresence exitBeforeEnter>
                {isLoading ? (
                  <Loading
                    key={'loading'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <AnimatedLogo width={156} height={156} />
                  </Loading>
                ) : (
                  <Component {...pageProps} key={router.route} />
                )}
              </AnimatePresence>
            </socketContext.Provider>
          </Provider>
        </ThemeProvider>
      </MuiThemeProvider>
    </>
  )
}
