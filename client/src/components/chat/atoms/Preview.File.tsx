import React from 'react'
import styled from 'styled-components'
import ArticleIcon from '@mui/icons-material/Article'
import { DropFile } from '../../../lib/interfaces'
import RegularText from '../../global/RegularText'
import { convertFileSize } from '../../../lib/helpers/convertFileSize'
import { getFileExtension } from '../../../lib/helpers/getFileExtension'

const IconBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 360px;
  height: 460px;
`
const FileOverflow = styled.div`
  overflow: hidden;
  height: 165px;
  margin: 25px 25px 0 25px;
`

const FileName = styled.h4`
  margin-bottom: 5px;
  text-align: center;
  white-space: pre-line;
  text-overflow: ellipsis;
`

const FileProps = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & > span {
    margin-bottom: 10px;
  }
`

const Icon = styled(ArticleIcon)`
  color: ${props => props.theme.fontColor.primary};
  font-size: 148px;
`

const PreviewFile = function PreviewFile(props: { file: DropFile }) {
  const { file } = props
  return (
    <IconBox>
      <FileOverflow>
        <FileName>{file.name}</FileName>
      </FileOverflow>
      <Icon />
      <FileProps>
        <RegularText>{`Size: ${convertFileSize(file.size)}`}</RegularText>
        <RegularText>{`Extension: ${getFileExtension(file.name)}`}</RegularText>
      </FileProps>
    </IconBox>
  )
}

export default PreviewFile
