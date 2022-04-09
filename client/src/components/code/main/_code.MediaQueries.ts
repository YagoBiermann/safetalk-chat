import { css } from 'styled-components'

const CodeContainerDesktop = css`
  @media (max-width: ${({ theme }) => theme.appBreakpoints.xlDesktop}) {
    min-width: 100vw;
    min-height: 100vh;
  }
`

const CodeContainerMobile = css`
  @media (max-height: ${({ theme }) => theme.appBreakpoints.mobile}) {
    justify-content: space-between;
    min-height: 130%;
  }
`

export { CodeContainerDesktop, CodeContainerMobile }
