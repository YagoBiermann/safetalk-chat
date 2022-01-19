import { css } from 'styled-components'

const HomeContainerDesktop = css`
  @media (max-width: ${props => props.theme.appBreakpoints.xlDesktop}) {
    min-width: 90vw;
  }
`

const HomeContainerMobile = css`
  @media (max-width: ${props => props.theme.appBreakpoints.xsMobile}) {
    min-width: 320px;
  }

  @media (max-height: ${props => props.theme.appBreakpoints.mobile}) {
    margin-top: 5px;
  }
`
export { HomeContainerDesktop, HomeContainerMobile }
