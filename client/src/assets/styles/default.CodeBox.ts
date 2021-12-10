import { css } from 'styled-components'

const CodeBoxStyle = css`
  padding: 10px 25px 25px 25px;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
  @media (max-width: ${({ theme }) => theme.mediaWidthSizes.medium}) {
    width: 80vw;
  }
  @media (max-width: ${({ theme }) => theme.mediaWidthSizes.small}) {
    width: 75vw;
    border-radius: 15px;
  }
`

export default CodeBoxStyle
