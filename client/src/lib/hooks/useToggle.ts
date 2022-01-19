import { useState } from 'react'

const useToggle = (initialValue?: boolean) => {
  const [isOpen, setOpen] = useState(initialValue)

  const toggle = () => setOpen(!isOpen)

  return { isOpen, toggle } as const
}

export { useToggle }
