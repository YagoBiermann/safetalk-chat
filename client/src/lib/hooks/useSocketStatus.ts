import { useContext, useEffect, useState } from 'react'
import { socketContext } from '../context/socketContext'

const useSocketStatus = () => {
  const [isDisconnected, disconnect] = useState(false)
  const socket = useContext(socketContext)

  useEffect(() => {
    socket.on('disconnect', () => {
      disconnect(true)
    })

    return () => {
      socket.off('disconnect')
    }
  }, [socket])

  return { isDisconnected }
}

export default useSocketStatus
