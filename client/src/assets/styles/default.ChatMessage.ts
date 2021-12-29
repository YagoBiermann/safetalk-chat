import { css } from 'styled-components'

const TextMessageStyle = css<{ bold?: boolean; fontSize?: string }>`
  color: ${props => props.theme.fontColor.secondary};
  font-size: ${props => props.fontSize || props.theme.fontSizes.small};
  font-weight: ${props => (props.bold ? 500 : 300)};
  margin: 0;
  word-break: break-word;
  white-space: pre-wrap;
  line-height: 1.25;
`
export default TextMessageStyle
