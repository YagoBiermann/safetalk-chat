import React from 'react'
import styled from 'styled-components'

const Background = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 100vw;
  z-index: 999;
  background: linear-gradient(
    203deg,
    rgb(135, 0, 90) 0%,
    rgba(34, 6, 45, 0.6894958667060574) 0%
  );
`

function DarkenBackground(props: any) {
  return <Background>{props.children}</Background>
}

export default DarkenBackground
