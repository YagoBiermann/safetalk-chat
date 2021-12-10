import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import Box from '../../global/Box'

const OuterBox = styled(Box)`
  align-items: flex-start;
  background-color: ${props => props.theme.colors.secondaryDark};
  border-radius: 25px 5px 5px 5px;
  height: 80vh;
  width: inherit;
`

function MessagesBox() {
  return <OuterBox></OuterBox>
}

export default MessagesBox
