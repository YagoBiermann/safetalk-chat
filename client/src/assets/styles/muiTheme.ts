import { createTheme } from '@mui/material/styles'
import { Palette } from './theme'

const muiTheme = createTheme({
  palette: {
    primary: {
      main: Palette.colors.primaryMain,
      light: Palette.colors.primaryLight,
      dark: Palette.colors.primaryDark
    },
    secondary: {
      main: Palette.colors.secondaryMain,
      light: Palette.colors.secondaryLight,
      dark: Palette.colors.secondaryDark
    }
  }
})

export default muiTheme
