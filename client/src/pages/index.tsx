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
import { HomeContainerDesktop, HomeContainerMobile } from './_home.MediaQueries'

const HomeContainer = styled(Container)`
  justify-content: space-around;

  ${HomeContainerDesktop}

  ${HomeContainerMobile}
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
