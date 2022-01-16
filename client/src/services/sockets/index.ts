import { io } from 'socket.io-client'
import { ENDPOINTS } from '../../lib/enums'

const socket = io(`${ENDPOINTS.FRONTEND_URL}chat`, {
  transports: ['websocket', 'polling'],
  path: '/socket.io'
})

export default socket
