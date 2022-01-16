import type { GetServerSideProps, NextPage } from 'next'
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
import { AnimatePresence, motion } from 'framer-motion'
import { PageAnimation } from '../_Animations'
import nookies from 'nookies'

const CodeContainer = styled(Container)`
  justify-content: space-around;
  ${CodeContainerDesktop}
  ${CodeContainerMobile}
`
export const getServerSideProps: GetServerSideProps = async ctx => {
  const cookies = nookies.get(ctx)
  const user = await fetch(
    `http://safetalk_nginx:80/api/v2/users/${cookies.username}`,
    {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Cookie: `token=${cookies.token}; HttpOnly`
      }
    }
  ).then(res => (res.ok ? res.json() : null))

  if (!user) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      user
    }
  }
}

const Code: NextPage = (props: any) => {
  const dispatch = useAppDispatch()
  const username = useAppSelector(state => state.user.username)
  const error = useAppSelector(state => state.app.error)

  // Set room code
  useEffect(() => {
    console.log(props.user)
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
      <AnimatePresence>
        {error && <ErrorAlert error={error} key={'codePageError'} />}
      </AnimatePresence>
    </>
  )
}

export default Code
