import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import styled from 'styled-components'
import BoxStyle from '../../../assets/styles/default.Box'
import CodeBoxStyle from '../../../assets/styles/default.CodeBox'
import { socketContext } from '../../../lib/context/socketContext'
import { useCreateRoomMutation } from '../../../services/api'
import { useAppDispatch, useAppSelector } from '../../../store'
import { setError } from '../../../store/ducks/app'
import Box from '../../global/Box'
import ButtonState from '../../global/ButtonState'
import CodeButton from '../shared/Code.Button'
import CodeTitle from '../shared/Code.Title'
import CodeInput from './CreateRoom.CodeInput'
import CopyButton from './CreateRoom.CopyButton'

const MainBox = styled(Box)`
  ${BoxStyle}
  ${CodeBoxStyle}
`

const CodeBox = styled(Box)`
  width: 100%;
`

function CreateRoom() {
  const [createRoom, result] = useCreateRoomMutation()
  const dispatch = useAppDispatch()
  const socket = useContext(socketContext)
  const router = useRouter()
  const username = useAppSelector(state => state.user.username)
  const roomCode = useAppSelector(state => state.user.roomCode)
  const socketID = useAppSelector(state => state.user.socketID)
  const isPending = useAppSelector(state => state.room.pending)

  const handleCreateRoom = () => {
    createRoom({ socketID, username, roomCode })
      .unwrap()
      .then(
        () => {
          socket.emit('room:join', { roomCode })
          router.replace(`/chat/${roomCode}`)
        },
        error => {
          dispatch(setError(error.data.message))
        }
      )
  }

  return (
    <MainBox>
      <Box>
        <CodeTitle text={'Invite the code to someone and create the room'} />
      </Box>
      <CodeBox direction="row">
        <CodeInput roomCode={roomCode}></CodeInput>
        <CopyButton roomCode={roomCode}></CopyButton>
      </CodeBox>
      <CodeButton
        disabled={isPending}
        onClick={() => {
          handleCreateRoom()
        }}
      >
        <ButtonState loading={result.isLoading} text="Create Room" />
      </CodeButton>
    </MainBox>
  )
}

export default CreateRoom
