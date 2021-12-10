import React from 'react'
import styled from 'styled-components'

const StyledTitle = styled.h3`
  color: whitesmoke;
  margin-bottom: 25px;
  text-align: center;
  @media (max-width: ${({ theme }) => theme.mediaWidthSizes.small}) {
    font-size: large;
  }
`

function CodeTitle(props: { text: string }) {
  return <StyledTitle>{props.text}</StyledTitle>
}

export default CodeTitle
