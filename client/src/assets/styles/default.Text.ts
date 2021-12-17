import { css } from 'styled-components'

const defaultText = css`
  color: ${({ theme }) => theme.fontColor.secondary};
  font-size: medium;
  font-weight: normal;
  line-height: 1.5;
`
export default defaultText
