import { motion } from 'framer-motion'
import React from 'react'
import styled from 'styled-components'
import { contentVariants } from './SideBar.Animations'
import { Divider } from '@mui/material'
import ContentHeader from './SideBar.ContentHeader'

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

type SideBarContentProps = {
  children: JSX.Element
}

function SideBarContent(props: SideBarContentProps) {
  return (
    <Content
      variants={contentVariants}
      animate="open"
      initial="closed"
      exit="closed"
      as={motion.div}
    >
      <ContentHeader />
      <Divider color="#424242" />
      {props.children}
    </Content>
  )
}

export default SideBarContent
