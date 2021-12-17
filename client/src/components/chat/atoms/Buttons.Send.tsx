import React from 'react'
import Send from '@material-ui/icons/Send'
import RoundedButton from '../../global/Button.Rounded'

const SendButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> =
  () => {
    return (
      <RoundedButton>
        <Send fontSize="medium" />
      </RoundedButton>
    )
  }

export default SendButton
