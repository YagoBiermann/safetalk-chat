import type { NextPage } from 'next'
import { useContext, useEffect } from 'react'
import styled from 'styled-components'
import Container from '../components/global/Container'
import ErrorAlert from '../components/global/ErrorAlert'
import Footer from '../components/home/footer/Footer'
import Header from '../components/home/header/Header'
import UsernameForm from '../components/home/usernameForm/UsernameForm'
import { socketContext } from '../lib/context/socketContext'
import { useAppDispatch, useAppSelector } from '../store'
import { setSocketID } from '../store/ducks/users'

const HomeContainer = styled(Container)`
  justify-content: space-around;
  @media (max-width: ${props => props.theme.mediaWidthSizes.xlarge}) {
    min-width: 90vw;
  }
  @media (max-width: ${props => props.theme.mediaWidthSizes.xsmall}) {
    min-width: 320px;
  }

  @media (max-height: ${props => props.theme.mediaWidthSizes.small}) {
    margin-top: 5px;
  }
`

const Home: NextPage = () => {
  const socket = useContext(socketContext)
  const error = useAppSelector(state => state.app.error)
  const dispatch = useAppDispatch()

  useEffect(() => {
    socket.on('connect', () => {
      dispatch(setSocketID(socket.id))
    })
  }, [])

  return (
    <>
      <HomeContainer>
        <Header />
        <UsernameForm />
        <Footer />
      </HomeContainer>
      {error ? <ErrorAlert error={error} /> : null}
    </>
  )
}

export default Home
