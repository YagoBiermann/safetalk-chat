import React from 'react'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'

const StyledButton = styled(IconButton)(
  ({ theme }) => `
    border: 2px solid ${theme.palette.primary.main};
    height: min-content;
    transition: ease-in-out 0.2s;
    &:hover {
      background-color: ${theme.palette.primary.light};
      opacity: 0.8;
      transform: scale(1.2);
    }
    > .MuiTouchRipple-root span {
      transform: scale(1.2);
    }
    & > svg {
      color: whitesmoke;
    }

  `
)

const OutlinedButton: React.FC<React.HTMLAttributes<HTMLButtonElement>> = (
  props: any
) => {
  return <StyledButton {...props}>{props.children}</StyledButton>
}

export default OutlinedButton
