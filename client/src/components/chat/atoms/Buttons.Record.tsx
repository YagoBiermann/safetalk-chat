import React from 'react'
import RoundedButton, { RoundeButtonProps } from '../../global/Button.Rounded'
import KeyboardVoice from '@material-ui/icons/KeyboardVoice'

const RecordButton = (props: Omit<RoundeButtonProps, 'children'>) => {
  return (
    <RoundedButton {...props}>
      <KeyboardVoice />
    </RoundedButton>
  )
}

export default RecordButton
