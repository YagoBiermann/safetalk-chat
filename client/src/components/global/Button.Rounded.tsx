import React from 'react'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import { SvgIconProps } from '@mui/material'

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

export type RoundeButtonProps = IconButtonProps & {
  children: SvgIconProps
}

const RoundedButton = ({ children, ...props }: RoundeButtonProps) => {
  return <StyledButton {...props}>{children}</StyledButton>
}

export default RoundedButton
