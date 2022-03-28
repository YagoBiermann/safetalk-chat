import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import BoxStyle from '../../../assets/styles/default.Box'
import CodeBoxStyle from '../../../assets/styles/default.CodeBox'
import CenterColumn from '../../../assets/styles/default.CenterColumn'
import allowOnlyLettersAndNumbers from '../../../lib/helpers/allowLettersAndNumbers'
import usePopover from '../../../lib/hooks/usePopover'
import { RoomCode } from '../../../lib/interfaces'
import { useJoinRoomMutation } from '../../../lib/services/api'
import { useAppDispatch, useAppSelector } from '../../../store'
import { setError } from '../../../store/ducks/app'
import ButtonState from '../../global/ButtonState'
import CodeButton from '../shared/Code.Button'
import CodePopper from '../shared/Code.Popper'
import JoinRoomInput from './JoinRoom.Input'
import sleep from '../../../lib/helpers/sleep'

const JoinRoomForm = styled.div`
  ${CenterColumn}
  ${BoxStyle}
  ${CodeBoxStyle}
`

function JoinRoom() {
  const { register, handleSubmit, setValue, resetField, watch } =
    useForm<RoomCode>({ defaultValues: { roomCode: '' } })
  const { anchorEl, handleClose, open, showPopover } = usePopover()
  const [joinRoom, result] = useJoinRoomMutation()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const sanitizedRoomCode = watch('roomCode', '')
  const isPending = useAppSelector(state => state.room.pending)

  const handleJoinRoom = (roomCode: string) => {
    resetField('roomCode')
    joinRoom({ roomCode })
      .unwrap()
      .then(
        () => {
          router.replace(`/chat/${roomCode}`)
        },
        async error => {
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
      onPointerDown={showPopover}
      onPointerLeave={handleClose}
      onMouseEnter={showPopover}
      onMouseLeave={handleClose}
    >
      <AnimatePresence>
        {open && (
          <CodePopper
            anchorEl={anchorEl}
            message="enter your code to join a room"
            open={open}
            key="joinRoomPopper"
          />
        )}
      </AnimatePresence>
      <JoinRoomInput
        {...register('roomCode')}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue('roomCode', allowOnlyLettersAndNumbers(e))
        }
        value={sanitizedRoomCode}
      />
      <CodeButton type="submit" disabled={isPending}>
        <ButtonState loading={result.isLoading} text="Join Room" />
      </CodeButton>
    </JoinRoomForm>
  )
}

export default JoinRoom
