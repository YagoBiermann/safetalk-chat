import { css } from 'styled-components'

const FormBoxMobile = css`
  @media (max-width: ${({ theme }) => theme.mediaWidthSizes.medium}) {
    min-width: fit-content;
    width: 75vw;
    border-radius: 20px;
    & input {
      width: 100%;
    }
  }

  @media (max-height: ${props => props.theme.mediaWidthSizes.small}) {
    max-width: 280px;
    padding: 20px;

    & input {
      height: 36px;
      max-width: 100%;
    }
    & button {
      height: 32px;
      margin-top: 15px;
      padding: 0;
    }
  }
`

export { FormBoxMobile }
