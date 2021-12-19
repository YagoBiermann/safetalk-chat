import React from 'react'
import PrimaryInput from '../../global/Input.Primary'
import styled from 'styled-components'
import CodeInputStyle from '../../../assets/styles/default.CodeInput'

const StyledInput = styled(PrimaryInput)`
  ${CodeInputStyle}
  text-transform: uppercase;
`

function CodeInput(props: { roomCode: string }) {
  return (
    <StyledInput
      value={props.roomCode}
      onClick={e => {
        e.currentTarget.select()
      }}
      readOnly
    />
  )
}

export default CodeInput
