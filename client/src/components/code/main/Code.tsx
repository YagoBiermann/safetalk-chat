import { useEffect } from 'react'
import { useAppSelector } from '../../../store'
import { setRoomCode, setUsername } from '../../../store/ducks/users'
import { useAppDispatch } from '../../../store'
import styled from 'styled-components'
import CreateRoom from '../../../components/code/createRoom/CreateRoom'
import ErrorAlert from '../../../components/global/ErrorAlert'
import JoinRoom from '../../../components/code/joinRoom/JoinRoom'
import Container from '../../../components/global/Container'
import {
  CodeContainerDesktop,
  CodeContainerMobile
} from '../../../components/code/main/_code.MediaQueries'
import { AnimatePresence, motion } from 'framer-motion'
import { PageAnimation } from '../../global/_Animations'
import nookies from 'nookies'
import { fetchCurrentUser, generateCode } from '../../../lib/services/api'
import { UserDTO } from '../../../lib/interfaces'

const CodeContainer = styled(Container)`
  justify-content: space-around;
  ${CodeContainerDesktop}
  ${CodeContainerMobile}
`

type CodePageProps = {
  user: UserDTO
  roomCode: string
}

const Code = (props: CodePageProps) => {
  const dispatch = useAppDispatch()
  const error = useAppSelector(state => state.app.error)

  // Set room code
  useEffect(() => {
    dispatch(setRoomCode(props.roomCode))
    dispatch(setUsername(props.user.username))
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
      <AnimatePresence>
        {error && <ErrorAlert error={error} key={'codePageError'} />}
      </AnimatePresence>
    </>
  )
}

export default Code
