import { css } from 'styled-components'

const HomeContainerDesktop = css`
  @media (max-width: ${props => props.theme.mediaWidthSizes.xlarge}) {
    min-width: 90vw;
  }
`

const HomeContainerMobile = css`
  @media (max-width: ${props => props.theme.mediaWidthSizes.xsmall}) {
    min-width: 320px;
  }

  @media (max-height: ${props => props.theme.mediaWidthSizes.small}) {
    margin-top: 5px;
  }
`
export { HomeContainerDesktop, HomeContainerMobile }
