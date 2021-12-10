import { io } from 'socket.io-client'
import { ENDPOINTS } from '../../lib/enums'

const socket = io(`${ENDPOINTS.FRONTEND_URL}`, {
  transports: ['websocket', 'polling'],
  path: '/socket.io'
})

socket.on('connect', () => {
  console.log('connected')
})

export default socket
