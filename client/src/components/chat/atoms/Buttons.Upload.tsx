import React from 'react'
import RoundedButton, { RoundeButtonProps } from '../../global/Button.Rounded'
import AttachFile from '@material-ui/icons/AttachFile'

const UploadButton = (props: Omit<RoundeButtonProps, 'children'>) => {
  return (
    <RoundedButton {...props}>
      <AttachFile />
    </RoundedButton>
  )
}

export default UploadButton
