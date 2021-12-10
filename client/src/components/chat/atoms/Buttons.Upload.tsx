import React from 'react'
import RoundedButton from '../../global/Button.Rounded'
import AttachFile from '@material-ui/icons/AttachFile'

function UploadButton(props: any) {
  return (
    <RoundedButton {...props}>
      <AttachFile />
    </RoundedButton>
  )
}

export default UploadButton
