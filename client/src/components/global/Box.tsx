import styled from 'styled-components'

interface BoxProps {
  alignItems?: string
  direction?: string
}

const Box = styled.div<BoxProps>`
  display: flex;
  align-items: ${props => props.alignItems || 'center'};
  flex-direction: ${props => props.direction || 'column'};
`

export default Box
