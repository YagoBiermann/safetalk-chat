import type { NextPage } from 'next'
import { useContext } from 'react'
import UsernameForm from '../components/home/molecules/UsernameForm'
import Container from '../components/global/Container'
import Header from '../components/home/molecules/Header'
import Footer from '../components/home/molecules/Footer'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../store'
import ErrorAlert from '../components/global/ErrorAlert'
import { useEffect } from 'react'
import { setSocketID } from '../store/ducks/users'
import { socketContext } from '../lib/context/socketContext'

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
