import React from 'react'
import RoundedButton from '../../global/Button.Rounded'
import KeyboardVoice from '@material-ui/icons/KeyboardVoice'

const RecordButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> =
  () => {
    return (
      <RoundedButton>
        <KeyboardVoice />
      </RoundedButton>
    )
  }

export default RecordButton
