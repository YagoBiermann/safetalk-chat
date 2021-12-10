import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAppSelector } from '../../store'
import { setRoomCode } from '../../store/ducks/users'
import { useAppDispatch } from '../../store'
import styled from 'styled-components'
import CreateRoom from '../../components/code/molecules/CreateRoom'
import ErrorAlert from '../../components/global/ErrorAlert'
import JoinRoom from '../../components/code/molecules/JoinRoom'
import Container from '../../components/global/Container'
import { ENDPOINTS } from '../../lib/enums'

const CodeContainer = styled(Container)`
  justify-content: space-around;

  @media (max-width: ${({ theme }) => theme.mediaWidthSizes.xlarge}) {
    min-width: 100vw;
    min-height: 100vh;
  }

  @media (max-height: ${({ theme }) => theme.mediaWidthSizes.small}) {
    justify-content: space-between;
    min-height: 130%;
  }
`

const Code: NextPage = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const username = useAppSelector(state => state.user.username)
  const socketID = useAppSelector(state => state.user.socketID)
  const error = useAppSelector(state => state.error.error)

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
    <CodeContainer>
      {error && <ErrorAlert error={error} />}
      <CreateRoom />
      <JoinRoom />
    </CodeContainer>
  )
}

export default Code
