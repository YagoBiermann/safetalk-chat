import React from 'react'
import OutlinedButton from '../../global/Button.Outlined'
import { OutlinedButtonProps } from '../../global/Button.Outlined'
import Close from '@material-ui/icons/Close'
import styled from 'styled-components'

const CloseButton = styled(OutlinedButton)`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  z-index: 9999;
  &:hover {
    transform: scale(1);
  }
  & > svg {
    color: ${props => props.theme.fontColor.secondary};
  }
  & > svg:hover {
    color: ${props => props.theme.fontColor.primary};
  }
`

const PreviewCloseButton = (props: Omit<OutlinedButtonProps, 'children'>) => {
  return (
    <CloseButton {...props}>
      <Close fontSize="large" />
    </CloseButton>
  )
}

export default PreviewCloseButton
