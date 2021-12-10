import { css } from 'styled-components'

const BoxStyle = css`
  background-color: ${({ theme }) => theme.colors.primaryDark};
  border-radius: 25px;
  padding: 25px;
  width: min-content;
  color: whitesmoke;
  box-shadow: 0px 10px 15px 10px rgba(0,0,0,0.7);
`
export default BoxStyle
