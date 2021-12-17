import React from 'react'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'

const StyledButton = styled(IconButton)(
  ({ theme }) => `
    background-color: ${theme.palette.primary.main};
    height: min-content;
    transition: background-color 0.2s ease-in-out;
    &:hover {
    background-color: ${theme.palette.primary.light};
  }
    & > svg {
    color: whitesmoke;
    padding: 5px;
  }
`
)

const RoundedButton: React.FC<React.HTMLAttributes<HTMLButtonElement>> = (
  props: any
) => {
  return <StyledButton {...props}>{props.children}</StyledButton>
}

export default RoundedButton
