import { AnimatePresence, motion } from 'framer-motion'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
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
import { PageAnimation } from './_Animations'

const HomeContainer = styled(Container)`
  justify-content: space-around;
  ${HomeContainerDesktop}
  ${HomeContainerMobile}
`

const Home: NextPage = () => {
  const router = useRouter()
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
      <HomeContainer
        as={motion.div}
        variants={PageAnimation}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Header />
        <UsernameForm />
        <Footer />
      </HomeContainer>
      {error ? <ErrorAlert error={error} /> : null}
    </>
  )
}

export default Home
