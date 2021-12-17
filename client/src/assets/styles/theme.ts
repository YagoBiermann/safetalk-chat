import 'styled-components'
import { DefaultTheme } from 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: {
        main: {
          elevation_0: string
          elevation_2: string
          elevation_4: string
        }
        light: {
          elevation_0: string
          elevation_2: string
          elevation_4: string
        }
        dark: {
          elevation_0: string
          elevation_2: string
          elevation_4: string
        }
      }
      secondary: {
        main: {
          elevation_0: string
          elevation_2: string
          elevation_4: string
        }
        light: {
          elevation_0: string
          elevation_2: string
          elevation_4: string
        }
        dark: {
          elevation_0: string
          elevation_2: string
          elevation_4: string
        }
      }
      grey: {
        elevation_0: string
        elevation_2: string
        elevation_4: string
      }
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
    fontColor: {
      primary: string
      secondary: string
      tertiary: string
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
    primary: {
      main: {
        elevation_0: 'rgb(101, 41, 138, 0.45)',
        elevation_2: 'rgb(101, 41, 138, 0.55)',
        elevation_4: 'rgb(101, 41, 138, 0.65)'
      },
      light: {
        elevation_0: 'rgba(150, 58, 166, 0.45)',
        elevation_2: 'rgba(150, 58, 166, 0.55)',
        elevation_4: 'rgba(150, 58, 166, 0.65)'
      },
      dark: {
        elevation_0: 'rgb(63, 20, 102, 0.45)',
        elevation_2: 'rgb(63, 20, 102, 0.55)',
        elevation_4: 'rgb(63, 20, 102, 0.65)'
      }
    },
    secondary: {
      main: {
        elevation_0: 'rgb(129, 53, 150, 0.45)',
        elevation_2: 'rgb(129, 53, 150, 0.55)',
        elevation_4: 'rgb(129, 53, 150, 0.65)'
      },
      light: {
        elevation_0: 'rgb(191, 87, 217, 0.45)',
        elevation_2: 'rgb(191, 87, 217, 0.55)',
        elevation_4: 'rgb(191, 87, 217, 0.65)'
      },
      dark: {
        elevation_0: 'rgb(87, 31, 122, 0.45)',
        elevation_2: 'rgb(87, 31, 122, 0.55)',
        elevation_4: 'rgb(87, 31, 122, 0.65)'
      }
    },
    grey: {
      elevation_0: '#212121',
      elevation_2: '#303030',
      elevation_4: '#424242'
    }
  },
  fonts: { primary: 'Roboto', secondary: 'sans-serif' },
  fontColor: { primary: '#f5f5f5', secondary: '#dcdcdc', tertiary: '#939393' },
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
