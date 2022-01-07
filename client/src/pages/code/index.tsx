import type { NextPage } from 'next'
import { useEffect } from 'react'
import { useAppSelector } from '../../store'
import { setRoomCode } from '../../store/ducks/users'
import { useAppDispatch } from '../../store'
import styled from 'styled-components'
import CreateRoom from '../../components/code/createRoom/CreateRoom'
import ErrorAlert from '../../components/global/ErrorAlert'
import JoinRoom from '../../components/code/joinRoom/JoinRoom'
import Container from '../../components/global/Container'
import { ENDPOINTS } from '../../lib/enums'
import { CodeContainerDesktop, CodeContainerMobile } from './_code.MediaQueries'
import { motion } from 'framer-motion'
import { PageAnimation } from '../_Animations'

const CodeContainer = styled(Container)`
  justify-content: space-around;
  ${CodeContainerDesktop}
  ${CodeContainerMobile}
`

const Code: NextPage = () => {
  const dispatch = useAppDispatch()
  const username = useAppSelector(state => state.user.username)
  const socketID = useAppSelector(state => state.user.socketID)
  const error = useAppSelector(state => state.app.error)

  // Redirect to home if username or socketID is not set
  useEffect(() => {
    if (!username || !socketID) {
      window.location.href = '/'
    }
  }, [])

  // Set room code
  useEffect(() => {
    async function getRoomCode() {
      const response = await fetch(`${ENDPOINTS.FRONTEND_URL}api/generateCode`)
      const roomCode = await response.json().then(data => data.code)
      dispatch(setRoomCode(roomCode))
    }
    getRoomCode()
  }, [])

  return (
    <>
      <CodeContainer
        variants={PageAnimation}
        initial="initial"
        as={motion.div}
        animate="animate"
        exit="exit"
      >
        <CreateRoom />
        <JoinRoom />
      </CodeContainer>
      {error ? <ErrorAlert error={error} /> : null}
    </>
  )
}

export default Code
