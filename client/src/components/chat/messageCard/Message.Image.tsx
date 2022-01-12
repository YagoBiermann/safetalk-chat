import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import TextMessageStyle from '../../../assets/styles/default.ChatMessage'
import { ImageMessageMobile } from './Message.MediaQueries'
import { AnimatePresence, motion } from 'framer-motion'
import DarkenBackground from '../../global/DarkenBackground'

const ImageTemplate = styled(motion.img)`
  align-self: center;
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
  cursor: pointer;
  ${ImageMessageMobile}
`

const ExpandedImage = styled(motion.img)`
  position: fixed;
  max-height: 70vh;
  max-width: 70vw;
  top: 15%;
  left: 15%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: auto;
  object-fit: cover;
  z-index: 999;
  cursor: pointer;

  @media (max-width: 768px) {
    top: 25%;
    left: 0;
    max-height: 100vh;
    max-width: 100vw;
  }
`

const Text = styled.p<{ bold?: boolean; fontSize?: string }>`
  ${TextMessageStyle};
  margin: 10px 10px 0 10px;
`

const Content = styled(motion.div)`
  display: flex;
  flex-direction: column;
`

function ImageMessage(props: { imageURL: string; message?: string }) {
  const { imageURL, message } = props
  const [isExpanded, setExpanded] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)

  const toggleExpanded = () => {
    setExpanded(!isExpanded)
  }

  return (
    <>
      <Content>
        <ImageTemplate
          ref={imageRef}
          onClick={toggleExpanded}
          draggable={false}
          src={imageURL}
        />
        {message ? <Text>{message}</Text> : null}
      </Content>
      <AnimatePresence>
        {isExpanded && (
          <DarkenBackground onClick={toggleExpanded}>
            <ExpandedImage
              draggable={false}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: 1
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.2
                }
              }}
              key={imageURL}
              src={imageURL}
              onClick={toggleExpanded}
            />
          </DarkenBackground>
        )}
      </AnimatePresence>
    </>
  )
}

export { ImageMessage }
