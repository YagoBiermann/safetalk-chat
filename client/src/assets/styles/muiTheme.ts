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
  }

  interface ThemeOptions {
    dark?: {
      elevation_0: string
      elevation_2: string
      elevation_4: string
      elevation_6: string
      elevation_8: string
      elevation_10: string
    }
    fontSizes?: {
      xsmall: string
      small: string
      medium: string
      large: string
      xLarge: string
    }
    fontColor?: {
      primary: string
      secondary: string
      tertiary: string
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
    'send-message-button': true
    'download-file-button': true
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
      main: appTheme.colors.primary.main,
      light: appTheme.colors.primary.light,
      dark: appTheme.colors.primary.dark
    },
    error: {
      main: alpha(red[500], 0.5)
    },
    success: {
      main: alpha(green[500], 0.5)
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
  fontColor: {
    primary: 'rgba(255, 255, 255, 0.9)',
    secondary: 'rgba(255, 255, 255, 0.7)',
    tertiary: 'rgba(255, 255, 255, 0.5)'
  },
  fontSizes: {
    xsmall: '12px',
    small: '14px',
    medium: '16px',
    large: '18px',
    xLarge: '20px'
  },
  components: {
    MuiSlider: {
      styleOverrides: {
        thumb: {
          backgroundColor: appTheme.fontColor.primary,
          ':hover': {
            boxShadow: 'none'
          },
          ':active': {
            boxShadow: `0px 0px 0px 8px ${alpha(
              appTheme.colors.primary.light,
              0.3
            )}`
          }
        },
        rail: {
          backgroundColor: alpha(appTheme.colors.primary.light, 0.7)
        }
      }
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: appTheme.fontColor.primary
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
          borderRadius: 25,
          '&:hover': {
            transition: 'all 0.2s ease-in-out'
          }
        },
        containedPrimary: {
          backgroundColor: alpha(appTheme.colors.primary.main, 0.4),
          color: alpha(appTheme.colors.primary.light, 0.5),
          '&:hover': {
            backgroundColor: alpha(appTheme.colors.primary.main, 0.6)
          }
        }
      },
      variants: [
        {
          props: { variant: 'confirm' },
          style: {
            width: '42px',
            height: '42px',
            border: `1px solid ${alpha(green[300], 0.3)}`,
            color: alpha(green[300], 1),
            ':hover': {
              backgroundColor: alpha(green[300], 0.3),
              transform: 'scale(1.2)'
            }
          }
        },
        {
          props: { variant: 'cancel' },
          style: {
            border: `1px solid ${alpha(red[300], 0.3)}`,
            width: '42px',
            height: '42px',
            color: alpha(red[300], 1),
            ':hover': {
              backgroundColor: alpha(red[300], 0.3),
              transform: 'scale(1.2)'
            }
          }
        },
        {
          props: { variant: 'send-message-button' },
          style: {
            width: '52px',
            height: '52px',
            border: `1px solid ${appTheme.fontColor.tertiary}`,
            backgroundColor: appTheme.colors.dark.elevation_2,
            color: appTheme.colors.primary.light,
            '&:hover': {
              transition: 'ease-in-out 0.2s',
              backgroundColor: appTheme.colors.primary.main,
              border: `1px solid ${appTheme.colors.primary.light}`
            }
          }
        },
        {
          props: { variant: 'download-file-button' },
          style: {
            width: '42px',
            height: '42px',
            border: `1px solid ${appTheme.fontColor.tertiary}`,
            backgroundColor: appTheme.colors.dark.elevation_2,
            color: appTheme.colors.primary.light,
            '&:hover': {
              transition: 'ease-in-out 0.2s',
              backgroundColor: appTheme.colors.primary.main,
              border: `1px solid ${appTheme.colors.primary.light}`
            }
          }
        },
        {
          props: { variant: 'outlined' },
          style: {
            border: `1px solid ${appTheme.colors.primary.main}`,
            transition: 'ease-in-out 0.2s',
            ':hover': {
              backgroundColor: appTheme.colors.primary.light,
              transform: 'scale(1.2)'
            }
          }
        }
      ]
    },
    MuiIconButton: {
      styleOverrides: {
        colorPrimary: {
          color: appTheme.colors.primary.main,
          transition: 'ease-in-out 0.2s',
          ':hover': {
            backgroundColor: appTheme.colors.primary.main
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
          backgroundColor: appTheme.colors.dark.elevation_8,
          color: appTheme.fontColor.primary,
          fontSize: appTheme.fontSizes.medium,
          fontWeight: 500
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '15px',
            '& fieldset': {
              transition: 'all ease-in-out 0.2s'
            },
            '&.Mui-focused fieldset': {
              borderColor: alpha(appTheme.colors.primary.light, 0.4)
            }
          },
          '& 	.MuiFilledInput-root': {
            backgroundColor: appTheme.colors.dark.elevation_6,
            borderRadius: '10px 10px 0 0'
          }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        outlined: {
          '&.Mui-focused': {
            color: appTheme.fontColor.primary
          }
        },
        filled: {
          '&.Mui-focused': {
            color: appTheme.fontColor.primary
          }
        }
      }
    }
  }
})

export default muiTheme
