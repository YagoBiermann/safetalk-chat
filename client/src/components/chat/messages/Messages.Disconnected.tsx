import DarkenBackground from '../../global/DarkenBackground'
import styled from 'styled-components'
import CenterColumn from '../../../assets/styles/default.CenterColumn'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MessageDisconnectedAnimation } from './Messages.Animations'

const MainBox = styled.div`
  height: 90vh;
  ${CenterColumn};
`
const DisconnectionMessage = styled.h3`
  margin: 0 0 20px 0;
`

const FooterMessage = styled.h6``

const BackToHome = styled.div`
  height: 25vh;
  ${CenterColumn};
`

const AnimatedDarkenBackground = motion(DarkenBackground)

function DisconnectedFromChat() {
  return (
    <AnimatedDarkenBackground
      variants={MessageDisconnectedAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <MainBox>
        <DisconnectionMessage>
          Looks like you are disconnected :(
        </DisconnectionMessage>
        <FooterMessage>
          Please, try to reconnect in a few minutes.
        </FooterMessage>
        <BackToHome>
          <Link href="/" replace>
            Return to home page
          </Link>
        </BackToHome>
      </MainBox>
    </AnimatedDarkenBackground>
  )
}

export default DisconnectedFromChat
