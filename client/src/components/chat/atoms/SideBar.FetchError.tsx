import React from 'react'
import styled from 'styled-components'
import TextMessageStyle from '../../../assets/styles/default.ChatMessage'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

const ErrorBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ErrorMessage = styled.p`
  ${TextMessageStyle}
  margin-top: 10px;
`

const ErrorIcon = styled(ErrorOutlineIcon)`
  font-size: 32px;
  color: #990000dd;
`

function FetchError() {
  return (
    <ErrorBox>
      <ErrorIcon />
      <ErrorMessage bold>Unable to fetch users list</ErrorMessage>
    </ErrorBox>
  )
}

export default FetchError
