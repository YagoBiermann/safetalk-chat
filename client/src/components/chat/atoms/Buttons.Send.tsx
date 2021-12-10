import React from 'react'
import Send from '@material-ui/icons/Send'
import RoundedButton from '../../global/Button.Rounded'

function SendButton(props: any) {
  return (
    <RoundedButton {...props}>
      <Send fontSize="medium" />
    </RoundedButton>
  )
}

export default SendButton
