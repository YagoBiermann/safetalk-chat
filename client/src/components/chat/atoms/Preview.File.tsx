import React from 'react'
import styled from 'styled-components'
import ArticleIcon from '@mui/icons-material/Article'
import { DropFile } from '../../../lib/interfaces'
import RegularText from '../../global/Text'

const IconBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 360px;
  height: 460px;
`
const FileName = styled.h3`
  margin-bottom: 5px;
`

const FileProps = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  & > span {
    margin-bottom: 10px;
  }
`

const Icon = styled(ArticleIcon)`
  color: ${props => props.theme.fontColor.primary};
  font-size: 148px;
`

const PreviewFile = function PreviewFile(
  props: Omit<DropFile, 'preview' | 'lastModified'>
) {
  return (
    <IconBox>
      <FileName>{props.name}</FileName>
      <Icon />
      <FileProps>
        <RegularText text={`Size: ${props.size / 1000000} Mb's`} />
        <RegularText text={`Type: ${props.type}`} />
      </FileProps>
    </IconBox>
  )
}

export default PreviewFile
