import React, { useContext } from 'react'
import styled from 'styled-components'
import { socketContext } from '../../../lib/context/socketContext'
import { useAppSelector, useAppDispatch } from '../../../store'
import { useRouter } from 'next/router'
import { useCreateRoomMutation } from '../../../services/api'
import { setError } from '../../../store/ducks/app'
import CodeTitle from '../atoms/Code.Title'
import CodeBoxStyle from '../../../assets/styles/default.CodeBox'
import CodeButton from '../atoms/Code.Button'
import ButtonState from '../../global/ButtonState'
import CopyButton from '../atoms/CreateRoom.CopyButton'
import CodeInput from '../atoms/CreateRoom.CodeInput'
import BoxStyle from '../../../assets/styles/default.Box'
import Box from '../../global/Box'

const MainBox = styled(Box)`
  ${BoxStyle}
  ${CodeBoxStyle}
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
        response => {
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
      <Box direction="row">
        <CodeInput roomCode={roomCode}></CodeInput>
        <CopyButton roomCode={roomCode}></CopyButton>
      </Box>
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
