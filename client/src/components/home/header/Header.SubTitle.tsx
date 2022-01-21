import React from 'react'
import styled from 'styled-components'

const StyledSubTitle = styled.h5`
  margin-top: 20px;

  @media (max-height: ${props => props.theme.appBreakpoints.mobile}) {
    order: 3;
    width: 100%;
    text-align: center;
    margin: 0;
    font-size: ${props => props.theme.fontSizes.medium};
  }
`

function SubTitle() {
  return <StyledSubTitle>Talk with confidentiality</StyledSubTitle>
}

export default SubTitle
