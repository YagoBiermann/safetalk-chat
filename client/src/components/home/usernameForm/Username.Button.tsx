import React from 'react'
import styled from 'styled-components'
import PrimaryButton from '../../global/Button.Primary'

const StyledPrimaryButton = styled(PrimaryButton)``

function UsernameButton(props: any) {
  return <StyledPrimaryButton {...props}>{props.children}</StyledPrimaryButton>
}

export default UsernameButton
