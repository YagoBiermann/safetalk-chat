import { css } from 'styled-components'

const BoxStyle = css`
  background-color: ${({ theme }) => theme.colors.dark.elevation_2};
  border-radius: 15px;
  padding: 25px;
  width: min-content;
  color: ${props => props.theme.fontColor.secondary};
  
`
export default BoxStyle
