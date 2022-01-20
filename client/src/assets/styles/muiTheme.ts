import { green, red } from '@mui/material/colors'
import { alpha, createTheme } from '@mui/material/styles'
import { appTheme } from './theme'

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
    mode: 'dark',
    primary: {
      main: appTheme.colors.primary.main.elevation_4,
      light: appTheme.colors.primary.light.elevation_4,
      dark: appTheme.colors.primary.dark.elevation_4
    },
    secondary: {
      main: appTheme.colors.secondary.main.elevation_4,
      light: appTheme.colors.secondary.light.elevation_4,
      dark: appTheme.colors.secondary.dark.elevation_4
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
    elevation_6: '#323232',
    elevation_8: '#383838',
    elevation_10: '#424242'
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
          backgroundColor: appTheme.fontColor.secondary,
          ':hover': {
            boxShadow: 'none'
          },
          ':active': {
            boxShadow: `0px 0px 0px 8px ${alpha(
              appTheme.colors.primary.light.elevation_4,
              0.12
            )}`
          }
        },
        rail: {
          backgroundColor: appTheme.colors.primary.main.elevation_4
        }
      }
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: appTheme.fontColor.secondary
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          minWidth: 'auto',
          minHeight: 'auto',
          width: 48,
          height: 48,
          transition: 'all 0.2s ease-in-out',
          borderRadius: 25,
          '&:hover': {
            backgroundColor: appTheme.colors.primary.main.elevation_4
          }
        },
        containedPrimary: {
          backgroundColor: appTheme.colors.primary.main.elevation_4,
          color: alpha(appTheme.colors.dark.elevation_2, 1),
          '&:hover': {
            backgroundColor: appTheme.colors.primary.light.elevation_4
          }
        }
      },
      variants: [
        {
          props: { variant: 'confirm' },
          style: {
            width: '42px',
            height: '42px',
            border: `1px solid ${green[500]}`,
            color: green[500],
            ':hover': {
              backgroundColor: alpha(green[500], 0.3),
              transform: 'scale(1.2)'
            }
          }
        },
        {
          props: { variant: 'cancel' },
          style: {
            border: `1px solid ${red[500]}`,
            width: '42px',
            height: '42px',
            color: red[500],
            ':hover': {
              backgroundColor: alpha(red[500], 0.3),
              transform: 'scale(1.2)'
            }
          }
        },
        {
          props: { variant: 'outlined' },
          style: {
            border: `1px solid ${appTheme.colors.primary.main.elevation_0}`,
            transition: 'ease-in-out 0.2s',
            ':hover': {
              backgroundColor: appTheme.colors.primary.light.elevation_0,
              transform: 'scale(1.2)'
            }
          }
        }
      ]
    },
    MuiIconButton: {
      styleOverrides: {
        colorPrimary: {
          color: alpha(appTheme.colors.primary.main.elevation_4, 1),
          transition: 'ease-in-out 0.2s',
          ':hover': {
            backgroundColor: appTheme.colors.primary.main.elevation_0
          }
        }
      }
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
    MuiPopover: {
      styleOverrides: {
        paper: {
          padding: '10px',
          borderRadius: '5px',
          border: 'none',
          color: appTheme.fontColor.secondary,
          fontSize: appTheme.fontSizes.medium,
          fontWeight: 500
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '15px'
          }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        outlined: {
          '&.Mui-focused': {
            color: appTheme.fontColor.secondary
          }
        }
      }
    }
  }
})

export default muiTheme
