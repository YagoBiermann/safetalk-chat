import React, { useContext, useEffect, useState } from 'react'
import AttachFile from '@material-ui/icons/AttachFile'
import { motion } from 'framer-motion'
import { Button, ButtonProps } from '@mui/material'
import { ButtonAnimation } from './SendMessage.Animations'
import { fileContext } from '../../../lib/context/fileContext'
import createFilePreview from '../../../lib/helpers/createFilePreview'

const UploadButton = (props: ButtonProps) => {
  const { files, setFiles } = useContext(fileContext)

  const openFileDialog = () => {
    const fileInput = document.getElementById(
      'uploadFileButton'
    ) as HTMLInputElement
    fileInput.click()
  }

  const selectedFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return
    const selectedFiles = Array.from(event.target.files)
    selectedFiles.forEach(file => {
      setFiles([...files, createFilePreview(file)])
    })
  }

  return (
    <>
      <input
        hidden
        type={'file'}
        id="uploadFileButton"
        onChange={selectedFile}
      />
      <Button
        onClick={openFileDialog}
        variant="send-message-button"
        color="primary"
        {...props}
      >
        <AttachFile
          component={motion.svg}
          whileHover={ButtonAnimation.animate}
          whileTap={ButtonAnimation.animate}
        />
      </Button>
    </>
  )
}

export default UploadButton
