import { css } from 'styled-components'

const BoxStyle = css`
  background-color: ${({ theme }) => theme.colors.primary.dark.elevation_0};
  border-radius: 25px;
  padding: 25px;
  width: min-content;
  color: ${props => props.theme.fontColor.secondary};
  box-shadow: 0px 10px 15px 10px rgba(0, 0, 0, 0.7);
`
export default BoxStyle
