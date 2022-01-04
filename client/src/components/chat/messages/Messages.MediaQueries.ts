import { css } from 'styled-components'

const dropzoneOuterBoxMobile = css`
  @media screen and (max-width: ${props =>
      props.theme.mediaWidthSizes.medium}) {
    top: 20%;
    left: 10%;
    width: 80%;
    height: 60%;
  }
`
const dropzoneInnerBoxMobile = css`
  @media screen and (max-width: ${props =>
      props.theme.mediaWidthSizes.medium}) {
    width: 70%;
    height: 70%;
  }
`

export { dropzoneOuterBoxMobile, dropzoneInnerBoxMobile }