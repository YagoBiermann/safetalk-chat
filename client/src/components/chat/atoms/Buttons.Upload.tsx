import React from 'react'
import RoundedButton from '../../global/Button.Rounded'
import AttachFile from '@material-ui/icons/AttachFile'

const UploadButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> =
  () => {
    return (
      <RoundedButton>
        <AttachFile />
      </RoundedButton>
    )
  }

export default UploadButton
