import { useRouter } from 'next/router'
import React, { useContext, useEffect, useRef } from 'react'
import styled from 'styled-components'
import BoxStyle from '../../../assets/styles/default.Box'
import CodeBoxStyle from '../../../assets/styles/default.CodeBox'
import CenterColumn from '../../../assets/styles/default.CenterColumn'
import CenterRow from '../../../assets/styles/default.CenterRow'
import { socketContext } from '../../../lib/context/socketContext'
import { useCreateRoomMutation } from '../../../services/api'
import { useAppDispatch, useAppSelector } from '../../../store'
import { setError } from '../../../store/ducks/app'
import ButtonState from '../../global/ButtonState'
import CodeButton from '../shared/Code.Button'
import CodeInput from './CreateRoom.CodeInput'
import CopyButton from './CreateRoom.CopyButton'
import usePopover from '../../../lib/hooks/usePopover'
import { AnimatePresence } from 'framer-motion'
import CodePopper from '../shared/Code.Popper'

const MainBox = styled.div`
  ${CenterColumn}
  ${BoxStyle}
  ${CodeBoxStyle}
`

const CodeBox = styled.div`
  ${CenterRow}
  width: 100%;
`

function CreateRoom() {
  const [createRoom, result] = useCreateRoomMutation()
  const { anchorEl, handleClose, open, showPopover } = usePopover()
  const dispatch = useAppDispatch()
  const socket = useContext(socketContext)
  const router = useRouter()
  const username = useAppSelector(state => state.user.username)
  const roomCode = useAppSelector(state => state.user.roomCode)
  const socketID = useAppSelector(state => state.user.socketID)
  const isPending = useAppSelector(state => state.room.pending)

  useEffect(() => {
    router.prefetch(`/chat/${roomCode}`)
  }, [])

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
    <MainBox
      onPointerDown={showPopover}
      onPointerLeave={handleClose}
      onMouseEnter={showPopover}
      onMouseLeave={handleClose}
    >
      <AnimatePresence exitBeforeEnter>
        {open && (
          <CodePopper
            anchorEl={anchorEl}
            open={open}
            key="createRoomPopper"
            message="Send the code to your friends and create the room"
          />
        )}
      </AnimatePresence>
      <CodeBox>
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
