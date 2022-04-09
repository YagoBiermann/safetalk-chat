import React from 'react'
import styled from 'styled-components'
import RegularText from '../../global/RegularText'
import ArticleIcon from '@mui/icons-material/Article'
import { convertFileSize } from '../../../lib/helpers/convertFileSize'
import DownloadIcon from '@mui/icons-material/Download'
import { motion } from 'framer-motion'
import { Button } from '@mui/material'
import { DownloadButtonAnimation } from './Message.Animations'
import { Divider } from '@mui/material'

const FileContent = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  margin: 0 10px 15px 10px;
`
const MessageContent = styled.div`
  margin: 15px 10px 0 10px;
`

const FileInfo = styled.div`
  display: flex;
  max-width: 300px;
  min-width: 200px;
  flex-direction: column;
  margin: 0 15px 0 15px;
`

const FileName = styled(RegularText)`
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: normal;
  overflow: hidden;
`
const FileOverflow = styled.div`
  display: flex;
  overflow: hidden;
`

const FileIcon = styled(ArticleIcon)`
  width: 42px;
  height: 42px;
`

type FileMessageProps = {
  message: string
  fileName: string
  fileSize: number
  fileType: string
  fileUrl: string
}

function FileMessage(props: FileMessageProps) {
  const fileType = props.fileType.split('/')[1]
  return (
    <>
      <FileContent>
        <FileIcon />
        <FileInfo>
          <FileOverflow>
            <FileName>
              <b>Name</b> {props.fileName}
            </FileName>
          </FileOverflow>
          <RegularText margin="5px 0 5px 0">
            <b>Size</b> {convertFileSize(props.fileSize)}
          </RegularText>
          <RegularText>
            <b>Type</b> {fileType}
          </RegularText>
        </FileInfo>
        <motion.div>
          <Button
            href={props.fileUrl}
            target={'_blank'}
            variant="download-file-button"
          >
            <DownloadIcon
              fontSize="medium"
              component={motion.svg}
              whileHover={DownloadButtonAnimation.animate}
              whileTap={DownloadButtonAnimation.animate}
            />
          </Button>
        </motion.div>
      </FileContent>
      <Divider color="#424242" />
      <MessageContent>
        <RegularText children={props.message} />
      </MessageContent>
    </>
  )
}

export { FileMessage }
