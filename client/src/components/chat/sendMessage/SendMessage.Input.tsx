import React, { ForwardedRef } from 'react'
import PrimaryInput from '../../global/Input.Primary'

interface propTypes {
  width?: string
  height?: string
  props?: any
}

const InputMessage = React.forwardRef(
  (props: propTypes, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <PrimaryInput
        ref={ref}
        {...props}
        width={props.width}
        placeholder="Type a message"
        autoComplete="off"
        maxLength={400}
      />
    )
  }
)

export default InputMessage
