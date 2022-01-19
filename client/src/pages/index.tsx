import { AnimatePresence, motion } from 'framer-motion'
import type { NextPage } from 'next'
import styled from 'styled-components'
import Container from '../components/global/Container'
import ErrorAlert from '../components/global/ErrorAlert'
import Footer from '../components/home/footer/Footer'
import Header from '../components/home/header/Header'
import UsernameForm from '../components/home/usernameForm/UsernameForm'
import { useAppSelector } from '../store'
import { HomeContainerDesktop, HomeContainerMobile } from './_home.MediaQueries'
import { PageAnimation } from './_Animations'

const HomeContainer = styled(Container)`
  justify-content: space-around;
  ${HomeContainerDesktop}
  ${HomeContainerMobile}
`

const Home: NextPage = () => {
  const error = useAppSelector(state => state.app.error)


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
      <AnimatePresence>
        {error && <ErrorAlert error={error} key={'homePageError'} />}
      </AnimatePresence>
    </>
  )
}

export default Home
