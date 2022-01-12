import { css } from 'styled-components'

const CodeBoxStyle = css`
  height: 150px;
  width: 420px;
  padding: 25px;
  transition: all 0.2s ease-in-out;
  border-radius: 15px;
  &:hover {
    transform: scale(1.05);
  }
  @media (max-width: ${({ theme }) => theme.mediaWidthSizes.medium}) {
    width: 80vw;
  }
  @media (max-width: ${({ theme }) => theme.mediaWidthSizes.small}) {
    width: 75vw;
  }
`

export default CodeBoxStyle
