import React from 'react'
import RoundedButton, { RoundeButtonProps } from '../../global/Button.Rounded'
import EmojiEmotions from '@material-ui/icons/EmojiEmotions'

const EmojiButton = (props: Omit<RoundeButtonProps, 'children'>) => {
  return (
    <RoundedButton {...props}>
      <EmojiEmotions />
    </RoundedButton>
  )
}

export default EmojiButton
