import React from 'react'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import { SvgIconProps } from '@mui/material'
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

type OutlinedButtonProps = IconButtonProps & {
  children: SvgIconProps
}

const OutlinedButton = ({ children, ...props }: OutlinedButtonProps) => {
  return <StyledButton {...props}>{children}</StyledButton>
}

export default OutlinedButton
