import styled from 'styled-components'
import React, { ForwardedRef } from 'react'
import PrimaryInput from '../../global/Input.Primary'

const StyledPrimaryInput = styled(PrimaryInput)`
  text-align: center;
  font-size: ${props => props.theme.fontSizes.medium};
`

const UsernameInput = React.forwardRef(
  (props: any, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <StyledPrimaryInput
        ref={ref}
        {...props}
        placeholder="enter your username"
        required
        maxLength={25}
        onInput={e => {
          ;(e.target as HTMLInputElement).setCustomValidity('')
        }}
        onInvalid={e => {
          ;(e.target as HTMLInputElement).setCustomValidity(
            'did you forget something? :P'
          )
        }}
      />
    )
  }
)

export default UsernameInput