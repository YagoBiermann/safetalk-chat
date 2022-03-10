import { css } from 'styled-components'
import { css as mcss } from '@mui/material/styles/'

const FormBoxMobile = css`
  @media (max-width: ${({ theme }) => theme.appBreakpoints.tablet}) {
    min-width: fit-content;
    width: 75vw;
    border-radius: 10px;
  }

  @media (max-height: ${props => props.theme.appBreakpoints.mobile}) {
    max-width: 280px;
    padding: 20px;
  }
`

const buttonMobile = mcss({
  width: '165px',
  height: '38px',
  marginTop: '25px',
  padding: 0
})

const inputTablet = mcss({
  width: '100%',
  borderRadius: '5px',
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px'
  }
})

export { FormBoxMobile, buttonMobile, inputTablet }
