import { css } from 'styled-components'

const FullScreenMobile = css`
  @media (max-width: ${props => props.theme.mediaWidthSizes.large}) {
    & button:last-child {
      display: none;
    }
  }
`
const AudioPlayerContentTablet = css`
  @media (max-width: ${props => props.theme.mediaWidthSizes.large}) {
    justify-content: flex-start;
    width: 300px;
  }
`

const AudioPlayerTimeTablet = css`
  @media (max-width: ${props => props.theme.mediaWidthSizes.large}) {
    margin: 0 15px 0 5px;
  }
`

export { FullScreenMobile, AudioPlayerContentTablet, AudioPlayerTimeTablet }
