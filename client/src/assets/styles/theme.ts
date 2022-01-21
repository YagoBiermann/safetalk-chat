import { alpha } from '@mui/material'
import 'styled-components'
import { DefaultTheme } from 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: {
        main: string
        light: string
        dark: string
      }
      dark: {
        elevation_0: string
        elevation_2: string
        elevation_4: string
        elevation_6: string
        elevation_8: string
        elevation_10: string
      }
    }
    fontSizes: {
      xsmall: string
      small: string
      medium: string
      large: string
      xLarge: string
    }
    fontColor: {
      primary: string
      secondary: string
      tertiary: string
    }
    appBreakpoints: {
      xsMobile: string
      mobile: string
      tablet: string
      desktop: string
      xlDesktop: string
    }
  }
}

const appTheme: DefaultTheme = {
  colors: {
    primary: {
      main: alpha('rgb(100, 40, 140, 1)', 0.3),
      light: alpha('rgba(150, 60, 160, 1)', 0.3),
      dark: alpha('rgb(63, 20, 102, 1)', 0.3)
    },
    dark: {
      elevation_0: '#171717',
      elevation_2: '#222222',
      elevation_4: '#272727',
      elevation_6: '#323232',
      elevation_8: '#383838',
      elevation_10: '#424242'
    }
  },
  fontColor: {
    primary: 'rgba(255, 255, 255, 0.9)',
    secondary: 'rgba(255, 255, 255, 0.8)',
    tertiary: 'rgba(255, 255, 255, 0.5)'
  },
  fontSizes: {
    xsmall: '12px',
    small: '14px',
    medium: '16px',
    large: '18px',
    xLarge: '20px'
  },
  appBreakpoints: {
    xsMobile: '360px',
    mobile: '400px',
    tablet: '600px',
    desktop: '900px',
    xlDesktop: '1366px'
  }
}

export { appTheme }
