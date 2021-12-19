import { AppProps } from 'next/dist/shared/lib/router/router'
import { GlobalStyle } from '../assets/styles/globals'
import { Palette } from '../assets/styles/theme'
import muiTheme from '../assets/styles/muiTheme'
import { ThemeProvider } from 'styled-components'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import Head from 'next/head'
import { Provider } from 'react-redux'
import store from '../store'

export default function App({ Component, pageProps }: AppProps) {
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
        <link rel="icon" href="/static/images/appLogo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin={'anonymous'}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <GlobalStyle />
      <MuiThemeProvider theme={muiTheme}>
        <ThemeProvider theme={Palette}>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </ThemeProvider>
      </MuiThemeProvider>
    </>
  )
}
