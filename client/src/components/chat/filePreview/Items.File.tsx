import React from 'react'
import styled from 'styled-components'
import ArticleIcon from '@mui/icons-material/Article'
import { FileWithPreview } from '../../../lib/interfaces'
import RegularText from '../../global/RegularText'
import { convertFileSize } from '../../../lib/helpers/convertFileSize'
import { getFileExtension } from '../../../lib/helpers/getFileExtension'
import {
  FileOverflowMobile,
  IconBoxMobile,
  IconMobile
} from './FilePreview.MediaQueries'

const IconBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 360px;
  height: 360px;

  ${IconBoxMobile}
`
const FileOverflow = styled.div`
  display: block;
  overflow: hidden;
  max-width: 300px;
  margin: 25px 25px 0 25px;

  ${FileOverflowMobile}
`

const FileName = styled.h4`
  text-overflow: ellipsis;
  text-align: center;
  white-space: nowrap
  margin-bottom: 5px;
  overflow: hidden;
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
  ${IconMobile}
`

const PreviewFile = function PreviewFile(props: { file: FileWithPreview }) {
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
