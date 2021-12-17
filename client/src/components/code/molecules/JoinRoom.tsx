import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import allowOnlyLettersAndNumbers from '../../../lib/helpers/allowLettersAndNumbers'
import { useAppSelector, useAppDispatch } from '../../../store'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { setRoomCode } from '../../../store/ducks/users'
import { RoomCode } from '../../../lib/interfaces'
import { useJoinRoomMutation } from '../../../services/api'
import { setError } from '../../../store/ducks/app'
import ButtonState from '../../global/ButtonState'
import CodeTitle from '../atoms/Code.Title'
import CodeBoxStyle from '../../../assets/styles/default.CodeBox'
import JoinRoomInput from '../atoms/JoinRoom.Input'
import CodeButton from '../atoms/Code.Button'
import Box from '../../global/Box'
import BoxStyle from '../../../assets/styles/default.Box'
import socket from '../../../services/sockets'

const JoinRoomForm = styled(Box)`
  ${BoxStyle}
  ${CodeBoxStyle}
`

function JoinRoom() {
  const { register, handleSubmit, setValue, resetField, watch } =
    useForm<RoomCode>({ defaultValues: { roomCode: '' } })
  const [joinRoom, result] = useJoinRoomMutation()
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
        response => {
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
