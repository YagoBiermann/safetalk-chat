import React from 'react'
import Send from '@material-ui/icons/Send'
import RoundedButton from '../../global/Button.Rounded'

const SendButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> =
  props => {
    return (
      <RoundedButton {...props}>
        <Send fontSize="medium" />
      </RoundedButton>
    )
  }

export default SendButton
