import React from 'react'
import styled from 'styled-components'

const Background = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  right: 0;
  height: 100vh;
  width: 100vw;
  z-index: 999;
  background: rgba(13, 13, 13, 0.4);
`

function DarkenBackground(props: any) {
  return <Background>{props.children}</Background>
}

export default DarkenBackground
