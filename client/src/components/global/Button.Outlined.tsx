import React from 'react'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'

const StyledButton = styled(IconButton)(
  ({ theme }) => `
    background-color: transparent;
    border: 2px solid ${theme.palette.primary.main};
    height: min-content;
    transition: ease-in-out 0.2s;
    &:hover {
      background-color: ${theme.palette.primary.light};
      transform: scale(1.2);
    }

  `
)

function OutlinedButton(props: any) {
  return <StyledButton {...props}>{props.children}</StyledButton>
}

export default OutlinedButton
