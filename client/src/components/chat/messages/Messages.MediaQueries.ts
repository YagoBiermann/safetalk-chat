import { css } from 'styled-components'

const dropzoneOuterBoxMobile = css`
  @media screen and (max-width: ${props =>
      props.theme.appBreakpoints.tablet}) {
    top: 20%;
    left: 10%;
    width: 80%;
    height: 60%;
  }
`
const dropzoneInnerBoxMobile = css`
  @media screen and (max-width: ${props =>
      props.theme.appBreakpoints.tablet}) {
    width: 70%;
    height: 70%;
  }
`

export { dropzoneOuterBoxMobile, dropzoneInnerBoxMobile }