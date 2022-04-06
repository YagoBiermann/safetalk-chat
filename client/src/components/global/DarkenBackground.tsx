import React from 'react'
import styled from 'styled-components'

const Background = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  right: 0;
  height: 100vh;
  width: 100vw;
  z-index: 999;
  background: rgba(0, 0, 0, 0.5);
`
type DarkenBackgroundProps = React.HTMLAttributes<HTMLDivElement> & {
  children: JSX.Element | JSX.Element[]
}

const DarkenBackground = React.forwardRef(
  (props: DarkenBackgroundProps, ref?: React.Ref<HTMLDivElement>) => {
    return (
      <Background {...props} ref={ref}>
        {props.children}
      </Background>
    )
  }
)

export default DarkenBackground
