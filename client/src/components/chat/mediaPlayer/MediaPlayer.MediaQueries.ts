import { css } from 'styled-components'

const FullScreenMobile = css`
  @media (max-width: ${props => props.theme.appBreakpoints.desktop}) {
    & button:last-child {
      display: none;
    }
  }
`
const AudioPlayerContentTablet = css`
  @media (max-width: ${props => props.theme.appBreakpoints.desktop}) {
    justify-content: flex-start;
    width: 300px;
  }
`

const AudioPlayerTimeTablet = css`
  @media (max-width: ${props => props.theme.appBreakpoints.desktop}) {
    margin: 0 15px 0 5px;
  }
`

export { FullScreenMobile, AudioPlayerContentTablet, AudioPlayerTimeTablet }
