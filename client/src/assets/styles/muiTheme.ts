import { green, red } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'
import { Palette } from './theme'

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
  }
})

export default muiTheme
