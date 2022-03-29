import React from 'react'
import styled from 'styled-components'

type RegularTextProps = {
  bold?: boolean
  color?: string
  margin?: string
  fontSize?: string
}

const Text = styled.span<RegularTextProps>`
  color: ${props => props.color || props.theme.fontColor.secondary};
  font-size: ${props => props.fontSize || props.theme.fontSizes.small};
  font-weight: ${props => (props.bold ? 600 : 400)};
  margin: ${props => props.margin || '0'};
  word-break: break-word;
  white-space: pre-wrap;
  line-height: 1.25;
`

const RegularText = (
  props: React.HTMLAttributes<HTMLSpanElement> & RegularTextProps
) => {
  return <Text {...props}>{props.children}</Text>
}
export type { RegularTextProps }
export default RegularText
