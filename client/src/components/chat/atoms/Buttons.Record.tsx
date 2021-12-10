import React from 'react'
import RoundedButton from '../../global/Button.Rounded'
import KeyboardVoice from '@material-ui/icons/KeyboardVoice'

function RecordButton(props: any) {
  return (
    <RoundedButton {...props}>
      <KeyboardVoice />
    </RoundedButton>
  )
}

export default RecordButton
