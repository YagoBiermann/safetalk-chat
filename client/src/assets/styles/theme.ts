import 'styled-components'
import { DefaultTheme } from 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primaryMain: string
      primaryLight: string
      primaryDark: string
      secondaryMain: string
      secondaryLight: string
      secondaryDark: string
    }
    fonts: {
      primary: string
      secondary: string
    }
    fontSizes: {
      small: string
      medium: string
      large: string
      xLarge: string
    }
    mediaWidthSizes: {
      xsmall: string
      small: string
      medium: string
      large: string
      xlarge: string
    }
  }
}

const Palette: DefaultTheme = {
  colors: {
    primaryMain: 'rgb(101, 41, 138, 0.90)',
    primaryLight: 'rgba(150, 58, 166, 0.80)',
    primaryDark: 'rgb(63, 20, 102, 0.70)',
    secondaryMain: 'rgb(129, 53, 150, 0.80)',
    secondaryLight: 'rgb(191, 87, 217, 0.85)',
    secondaryDark: 'rgb(87, 31, 122, 0.70)'
  },
  fonts: { primary: 'Roboto', secondary: 'sans-serif' },
  fontSizes: {
    small: '16px',
    medium: '18px',
    large: '20px',
    xLarge: '24px'
  },
  mediaWidthSizes: {
    xsmall: '360px',
    small: '400px',
    medium: '600px',
    large: '900px',
    xlarge: '1366px'
  }
}

export { Palette }
