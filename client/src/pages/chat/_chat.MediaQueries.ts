import { css } from 'styled-components'

const ChatContainerDesktop = css`
  @media screen and (max-width: ${props =>
      props.theme.appBreakpoints.xlDesktop}) {
    align-items: flex-start;
  }
`

const ChatBoxDesktop = css`
  @media screen and (min-width: ${props =>
      props.theme.appBreakpoints.xlDesktop}) {
    width: 65vw;
  }

  @media screen and (max-width: ${props =>
      props.theme.appBreakpoints.xlDesktop}) {
    margin-left: 30px;
    width: 80vw;
  }
`

const ChatBoxMobile = css`
  @media screen and (max-width: ${props =>
      props.theme.appBreakpoints.tablet}) {
    width: 100vw;
    height: 100vh;
    margin: 0;
    justify-content: flex-end;
  }
`

const ChatHeaderMobile = css`
  @media screen and (max-width: ${props =>
      props.theme.appBreakpoints.tablet}) {
    display: flex;
    width: 100vw;
    height: 74px;
  }
`

export { ChatBoxDesktop, ChatBoxMobile, ChatContainerDesktop, ChatHeaderMobile }
