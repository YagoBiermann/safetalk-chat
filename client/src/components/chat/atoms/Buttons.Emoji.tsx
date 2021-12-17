import React from 'react'
import RoundedButton from '../../global/Button.Rounded'
import EmojiEmotions from '@material-ui/icons/EmojiEmotions'

const EmojiButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> =
  () => {
    return (
      <RoundedButton>
        <EmojiEmotions />
      </RoundedButton>
    )
  }

export default EmojiButton
