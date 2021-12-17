import React from 'react'
import styled from 'styled-components'

const Image = styled.img`
  border-radius: 10px 10px 0px 0;
  width: 100%;
  height: 100%;
`

function PreviewImage(props: { src: string }) {
  return <Image src={props.src} />
}

export default PreviewImage
