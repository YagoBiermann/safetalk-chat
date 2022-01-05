import { motion } from 'framer-motion'
import React from 'react'
import styled from 'styled-components'
import { contentAnimation } from './Sidebar.Animations'
import { Divider } from '@mui/material'
import ContentHeader from './Sidebar.ContentHeader'

const Content = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

type SidebarContentProps = {
  children: JSX.Element
}

function SidebarContent(props: SidebarContentProps) {
  return (
    <Content
      variants={contentAnimation}
      animate="open"
      initial="closed"
      exit="closed"
    >
      <ContentHeader />
      <Divider color="#424242" />
      {props.children}
    </Content>
  )
}

export default SidebarContent
