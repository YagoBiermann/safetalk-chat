import React from 'react'
import { Socket } from 'socket.io-client'
import socket from '../../services/sockets'

const socketContext = React.createContext<Socket>(socket)

export { socketContext }
