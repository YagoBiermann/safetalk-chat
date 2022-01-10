import { green, red } from '@mui/material/colors'
import { alpha, createTheme } from '@mui/material/styles'
import { Palette } from './theme'

declare module '@mui/material/styles' {
  interface Theme {
    dark: {
      elevation_0: string
      elevation_2: string
      elevation_4: string
      elevation_6: string
      elevation_8: string
      elevation_10: string
    }
  }

  interface ThemeOptions {
    dark?: {
      elevation_0?: string
      elevation_2?: string
      elevation_4?: string
      elevation_6?: string
      elevation_8?: string
      elevation_10?: string
    }
  }
  interface BreakpointOverrides {
    xs: false
    sm: false
    md: false
    lg: false
    xl: false
    xsMobile: true
    mobile: true
    tablet: true
    desktop: true
    xlDesktop: true
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    confirm: true
    cancel: true
  }
}

declare module '@mui/material/Badge' {
  interface BadgePropsVariantOverrides {
    sidebar: true
  }
}

const muiTheme = createTheme({
  palette: {
    primary: {
      main: Palette.colors.primary.main.elevation_4,
      light: Palette.colors.primary.light.elevation_4,
      dark: Palette.colors.primary.dark.elevation_4
    },
    secondary: {
      main: Palette.colors.secondary.main.elevation_4,
      light: Palette.colors.secondary.light.elevation_4,
      dark: Palette.colors.secondary.dark.elevation_4
    },
    error: {
      main: red[500]
    },
    success: {
      main: green[500]
    }
  },
  dark: {
    elevation_0: '#121212',
    elevation_2: '#222222',
    elevation_4: '#272727',
    elevation_8: '#333333',
    elevation_10: '#383838'
  },
  breakpoints: {
    values: {
      xsMobile: 360,
      mobile: 400,
      tablet: 600,
      desktop: 900,
      xlDesktop: 1366
    }
  },
  components: {
    MuiSlider: {
      styleOverrides: {
        thumb: {
          backgroundColor: Palette.fontColor.secondary,
          ':hover': {
            boxShadow: 'none'
          },
          ':active': {
            boxShadow: `0px 0px 0px 8px ${alpha(
              Palette.colors.primary.light.elevation_4,
              0.12
            )}`
          }
        },
        rail: {
          backgroundColor: Palette.colors.primary.main.elevation_4
        }
      }
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: Palette.fontColor.secondary,
          padding: '5px'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          height: 'min-content'
        }
      },
      variants: [
        {
          props: { variant: 'confirm' },
          style: {
            border: `1px solid ${green[200]}`,
            ':hover': {
              backgroundColor: green[200],
              transform: 'scale(1.1)'
            }
          }
        },
        {
          props: { variant: 'cancel' },
          style: {
            border: `1px solid ${red[200]}`,
            ':hover': {
              backgroundColor: red[200],
              transform: 'scale(1.1)'
            }
          }
        }
      ]
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: '15px'
        },
        standardError: {
          backgroundColor: red[200]
        }
      }
    },
    MuiBadge: {
      variants: [
        {
          props: { variant: 'sidebar' },
          style: {
            borderRadius: '25px',
            backgroundColor: Palette.colors.grey.elevation_4,
            width: '25px',
            height: '25px',
          }
        }
      ]
    }
  }
})

export default muiTheme
