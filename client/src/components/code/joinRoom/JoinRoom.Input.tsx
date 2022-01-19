import styled from 'styled-components'
import React, { ForwardedRef } from 'react'
import PrimaryInput from '../../global/Input.Primary'
import CodeInputStyle from '../../../assets/styles/default.CodeInput'

const StyledInput = styled(PrimaryInput)`
  ${CodeInputStyle}
`

const JoinRoomInput = React.forwardRef(
  (props: any, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <StyledInput
        ref={ref}
        {...props}
        placeholder="Enter your code"
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

export default JoinRoomInput
