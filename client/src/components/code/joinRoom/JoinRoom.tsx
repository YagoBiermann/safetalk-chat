import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import BoxStyle from '../../../assets/styles/default.Box'
import CodeBoxStyle from '../../../assets/styles/default.CodeBox'
import { socketContext } from '../../../lib/context/socketContext'
import allowOnlyLettersAndNumbers from '../../../lib/helpers/allowLettersAndNumbers'
import { RoomCode } from '../../../lib/interfaces'
import { useJoinRoomMutation } from '../../../services/api'
import { useAppDispatch, useAppSelector } from '../../../store'
import { setError } from '../../../store/ducks/app'
import { setRoomCode } from '../../../store/ducks/users'
import Box from '../../global/Box'
import ButtonState from '../../global/ButtonState'
import CodeButton from '../shared/Code.Button'
import CodeTitle from '../shared/Code.Title'
import JoinRoomInput from './JoinRoom.Input'

const JoinRoomForm = styled(Box)`
  ${BoxStyle}
  ${CodeBoxStyle}
`

function JoinRoom() {
  const { register, handleSubmit, setValue, resetField, watch } =
    useForm<RoomCode>({ defaultValues: { roomCode: '' } })
  const [joinRoom, result] = useJoinRoomMutation()
  const socket = useContext(socketContext)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const sanitizedRoomCode = watch('roomCode', '')
  const username = useAppSelector(state => state.user.username)
  const socketID = useAppSelector(state => state.user.socketID)
  const isPending = useAppSelector(state => state.room.pending)

  const handleJoinRoom = (roomCode: string) => {
    resetField('roomCode')
    joinRoom({ socketID, username, roomCode })
      .unwrap()
      .then(
        () => {
          dispatch(setRoomCode(roomCode))
          socket.emit('room:join', { roomCode })
          router.replace(`/chat/${roomCode}`)
        },
        error => {
          dispatch(setError(error.data.message))
        }
      )
  }

  return (
    <JoinRoomForm
      as="form"
      autoComplete="off"
      onSubmit={handleSubmit(data => {
        handleJoinRoom(data.roomCode)
      })}
    >
      <Box>
        <CodeTitle text={'type the code that someone sent to you'} />
      </Box>
      <JoinRoomInput
        {...register('roomCode')}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue('roomCode', allowOnlyLettersAndNumbers(e))
        }
        value={sanitizedRoomCode}
      />
      <CodeButton disabled={isPending}>
        <ButtonState loading={result.isLoading} text="Join Room" />
      </CodeButton>
    </JoinRoomForm>
  )
}

export default JoinRoom
