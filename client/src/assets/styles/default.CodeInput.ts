import { css } from 'styled-components'

const CodeInputStyle = css`
  text-align: center;
  font-size: ${props => props.theme.fontSizes.medium};
  @media (max-width: ${({ theme }) => theme.mediaWidthSizes.medium}) {
    width: 100%;
  }
`

export default CodeInputStyle
