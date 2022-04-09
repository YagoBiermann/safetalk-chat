import { css } from 'styled-components'

const MessageFormMobile = css`
  @media screen and (max-width: ${props => props.theme.appBreakpoints.tablet}) {
    flex-direction: column-reverse;
    width: 100vw;
    margin-top: 15px;
    & > input {
      border-radius: 0;
    }
  }
`

const RecorderMobile = css`
  @media screen and (max-width: ${props => props.theme.appBreakpoints.tablet}) {
    margin: 0 0 15px 0;
    justify-content: center;
    & #recordTimerBox {
      margin: 0 15px 0 15px;
    }
  }
`

const SendMessageButtonsMobile = css`
  @media screen and (max-width: ${props => props.theme.appBreakpoints.tablet}) {
    margin: 0 0 15px 0;
    width: 100%;
    justify-content: center;
    flex-direction: row-reverse;
  }
`

const EmojiPickerDesktop = css`
  @media screen and (max-width: ${props =>
      props.theme.appBreakpoints.desktop}) {
    bottom: 160px;
  }
`

const EmojiPickerTablet = css`
  @media screen and (max-width: ${props => props.theme.appBreakpoints.tablet}) {
    left: 50%;
    transform: translate(-50%, 0);
    bottom: 150px;
  }
`

const EmojiPickerMobile = css`
  @media screen and (max-width: ${props => props.theme.appBreakpoints.mobile}) {
    bottom: 150px;
  }
`

export {
  MessageFormMobile,
  RecorderMobile,
  SendMessageButtonsMobile,
  EmojiPickerMobile,
  EmojiPickerTablet,
  EmojiPickerDesktop
}
