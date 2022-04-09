import React from 'react'

type EmojiContext = {
  isEmojiPickerOpen: boolean
  setEmojiPickerOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const DEFAULT_VALUE = {
  isEmojiPickerOpen: false,
  setEmojiPickerOpen: () => {}
}

const emojiContext = React.createContext<EmojiContext>(DEFAULT_VALUE)

export type { EmojiContext }
export { emojiContext }
