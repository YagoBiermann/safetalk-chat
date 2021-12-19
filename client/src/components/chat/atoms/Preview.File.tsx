import React from 'react'
import styled from 'styled-components'
import ArticleIcon from '@mui/icons-material/Article'

const IconBox = styled.div`
  width: inherit;
  height: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Icon = styled(ArticleIcon)`
  color: ${props => props.theme.fontColor.primary};
  font-size: 148px;
`
const HeaderText = styled.h2`
  color: ${props => props.theme.fontColor.primary};
`

const FileData = styled.li`
  color: ${props => props.theme.fontColor.secondary};
`

const PreviewFile = function PreviewFile(props: { name: string }) {
  return (
    <IconBox>
      <HeaderText>Unable to show preview</HeaderText>
      <Icon />
      <ul>
        <FileData>{`File: ${props.name}`}</FileData>
        <FileData>{`Size: ${props.name}`}</FileData>
        <FileData>{`Type: ${props.name}`}</FileData>
      </ul>
    </IconBox>
  )
}

export default PreviewFile
