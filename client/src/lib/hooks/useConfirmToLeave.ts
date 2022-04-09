import { useEffect } from 'react'

const useConfirmToLeave = () => {
  useEffect(() => {
    function confirmToLeave() {
      return 'Are you sure you want to leave this room?'
    }
    window.onbeforeunload = confirmToLeave

    return () => {
      window.removeEventListener('beforeunload', confirmToLeave)
    }
  })
  return null
}

export default useConfirmToLeave
