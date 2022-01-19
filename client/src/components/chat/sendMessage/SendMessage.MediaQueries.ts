import { css } from 'styled-components'

const MessageFormMobile = css`
  @media screen and (max-width: ${props =>
      props.theme.appBreakpoints.tablet}) {
    flex-direction: column-reverse;
    width: 100vw;
    margin-top: 15px;
    & > input {
      border-radius: 0;
    }
  }
`

const RecorderMobile = css`
  @media screen and (max-width: ${props =>
      props.theme.appBreakpoints.tablet}) {
    margin: 0 0 15px 0;
    justify-content: center;
    & #recordTimerBox {
      margin: 0 15px 0 15px;
    }
  }
`

const SendMessageButtonsMobile = css`
  @media screen and (max-width: ${props =>
      props.theme.appBreakpoints.tablet}) {
    margin: 0 0 15px 0;
    width: 100%;
    justify-content: center;
    flex-direction: row-reverse;
  }
`

export { MessageFormMobile, RecorderMobile, SendMessageButtonsMobile }
