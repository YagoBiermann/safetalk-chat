import React from 'react'
import styled from 'styled-components'

const StyledSubTitle = styled.h4`
  color: whitesmoke;
  margin-top: 15px;
  font-size: ${props => props.theme.fontSizes.large};

  @media (max-height: ${props => props.theme.mediaWidthSizes.small}) {
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
