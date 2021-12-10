import React from 'react'
import RoundedButton from '../../global/Button.Rounded'
import EmojiEmotions from '@material-ui/icons/EmojiEmotions'

function EmojiButton(props: any) {
  return (
    <RoundedButton {...props}>
      <EmojiEmotions />
    </RoundedButton>
  )
}

export default EmojiButton
