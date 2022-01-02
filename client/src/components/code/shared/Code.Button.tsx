import React from 'react'
import styled from 'styled-components'
import PrimaryButton from '../../global/Button.Primary'

const StyledButton = styled(PrimaryButton)`
  @media (max-width: ${({ theme }) => theme.mediaWidthSizes.medium}) {
    width: 60%;
  }

  @media (max-width: ${({ theme }) => theme.mediaWidthSizes.small}) {
    width: fit-content;
  }
`

function CodeButton(props: any) {
  return <StyledButton {...props}>{props.children}</StyledButton>
}

export default CodeButton
