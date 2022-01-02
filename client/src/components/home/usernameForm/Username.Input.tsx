import React, { ForwardedRef } from 'react'
import styled from 'styled-components'
import PrimaryInput from '../../global/Input.Primary'

const StyledPrimaryInput = styled(PrimaryInput)`
  text-align: center;
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
