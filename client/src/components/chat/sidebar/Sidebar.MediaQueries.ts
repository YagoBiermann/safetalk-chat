import { css } from 'styled-components'
import { css as mcss, Theme } from '@mui/material/styles'

const sidebarMobile = css`
  @media screen and (max-width: ${props =>
      props.theme.mediaWidthSizes.medium}) {
    transform: translateX(-50%);
    top: 0;
    left: 50%;
    border-radius: 0 0 10px 10px;
    padding: 0;
  }
`

const badgeBoxMobile = css`
  @media screen and (max-width: ${props =>
      props.theme.mediaWidthSizes.medium}) {
    margin: 0;
    display: flex;
    justify-content: center;
  }
`

const badgeMobile = mcss({
  borderRadius: '15px',
  padding: '10px',
  width: '0px',
  height: '0px'
})

export { sidebarMobile, badgeBoxMobile, badgeMobile }
