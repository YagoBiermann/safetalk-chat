import React, { ForwardedRef } from 'react'
import PrimaryInput from '../../global/Input.Primary'
import styled from 'styled-components'

const StyledInput = styled(PrimaryInput)`
  width: 100%;
`

const InputMessage = React.forwardRef(
  (props: any, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <StyledInput
        ref={ref}
        {...props}
        placeholder="Type a message"
        autoComplete="off"
        maxLength={400}
      />
      
    )
  }
)

export default InputMessage
