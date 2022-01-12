import { css } from 'styled-components'

const PreviewThumbnailMobile = css`
  @media screen and (max-width: ${props =>
      props.theme.appBreakpoints.tablet}) {
    max-width: 90vw;
    max-height: 90vh;
  }
`
const FileOverflowMobile = css`
  @media screen and (max-width: ${props =>
      props.theme.appBreakpoints.tablet}) {
    max-width: 260px;
    max-height: 90px;
  }
`

const IconBoxMobile = css`
  @media screen and (max-width: ${props =>
      props.theme.appBreakpoints.tablet}) {
    width: 300px;
    height: 300px;
  }
`
const IconMobile = css`
  @media screen and (max-width: ${props =>
      props.theme.appBreakpoints.tablet}) {
    font-size: 100px;
  }
`

export { PreviewThumbnailMobile, FileOverflowMobile, IconBoxMobile, IconMobile }
