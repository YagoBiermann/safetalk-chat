import React from 'react'
import styled from 'styled-components'

const Image = styled.img`
  max-width: inherit;
  max-height: inherit;
  overflow: hidden;
`

function PreviewImage(props: { src: string }) {
  return <Image src={props.src} />
}

export default PreviewImage
