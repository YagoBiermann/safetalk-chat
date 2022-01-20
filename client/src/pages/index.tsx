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
import Link from 'next/link'
import { useFetchCurrentUserQuery } from '../services/api'

const HomeContainer = styled(Container)`
  justify-content: space-around;
  ${HomeContainerDesktop}
  ${HomeContainerMobile}
`
const BottomText = styled(motion.div)`
  margin-top: 25px;
  text-align: center;
  & a:hover {
    color: #ecbaff;
    text-decoration: none;
  }
  & b {
    color: #ecbaff;
  }
`

const Home: NextPage = () => {
  const error = useAppSelector(state => state.app.error)
  const { isSuccess, data } = useFetchCurrentUserQuery(undefined, {})

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
        <div>
          <UsernameForm />
          {isSuccess && (
            <BottomText animate={{ opacity: [0, 1] }}>
              <Link replace href={`/chat/${data?.room.roomCode}`}>
                <a draggable="false">
                  Or continue as <b>{data?.username}</b> on last room
                </a>
              </Link>
            </BottomText>
          )}
        </div>
        <Footer />
      </HomeContainer>
      <AnimatePresence>
        {error && <ErrorAlert error={error} key={'homePageError'} />}
      </AnimatePresence>
    </>
  )
}

export default Home
