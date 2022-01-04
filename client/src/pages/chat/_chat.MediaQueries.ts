import { css } from 'styled-components'

const ChatContainerDesktop = css`
  @media screen and (max-width: ${props =>
      props.theme.mediaWidthSizes.xlarge}) {
    align-items: flex-start;
  }
`

const ChatBoxDesktop = css`
  @media screen and (min-width: ${props =>
      props.theme.mediaWidthSizes.xlarge}) {
    width: 65vw;
  }

  @media screen and (max-width: ${props =>
      props.theme.mediaWidthSizes.xlarge}) {
    margin-left: 30px;
    width: 80vw;
  }
`

const ChatBoxMobile = css`
  @media screen and (max-width: ${props =>
      props.theme.mediaWidthSizes.medium}) {
    width: 100vw;
    height: 100vh;
    margin: 0;
    justify-content: flex-end;
  }
`

const ChatHeaderMobile = css`
  @media screen and (max-width: ${props =>
      props.theme.mediaWidthSizes.medium}) {
    display: flex;
    width: 100vw;
    height: 74px;
  }
`

export { ChatBoxDesktop, ChatBoxMobile, ChatContainerDesktop, ChatHeaderMobile }
