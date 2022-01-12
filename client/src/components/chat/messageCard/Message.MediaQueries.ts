import { css } from 'styled-components'

const ImageMessageMobile = css`
  @media (max-width: ${props => props.theme.appBreakpoints.desktop}) {
    max-height: 250px;
  }
`

const MessageCardMobile = css<{ myMessage?: boolean }>`
  @media (max-width: ${props => props.theme.appBreakpoints.tablet}) {
    max-width: 100%;
    border-radius: 10px;
    background-color: #161616;
    border: ${props =>
      props.myMessage
        ? `1px solid ${props.theme.colors.primary.light.elevation_0}`
        : null};
    box-shadow: none;
    margin: 10px;
  }
`

const MessageCardTablet = css`
  @media screen and (max-width: ${props => props.theme.appBreakpoints.desktop}) {
    margin: 20px;
    max-width: 60%;
  }
`

const MessageCardDesktop = css`
  @media screen and (max-width: ${props =>
      props.theme.appBreakpoints.xlDesktop}) {
    max-width: 45%;
  }
`

export {
  ImageMessageMobile,
  MessageCardMobile,
  MessageCardTablet,
  MessageCardDesktop
}
