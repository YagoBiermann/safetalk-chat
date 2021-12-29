import React from 'react'
import Send from '@material-ui/icons/Send'
import RoundedButton, { RoundeButtonProps } from '../../global/Button.Rounded'

const SendButton = (props: Omit<RoundeButtonProps, 'children'>) => {
  return (
    <RoundedButton {...props}>
      <Send fontSize="medium" />
    </RoundedButton>
  )
}

export default SendButton
