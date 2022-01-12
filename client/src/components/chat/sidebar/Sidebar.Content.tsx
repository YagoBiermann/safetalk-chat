import { motion } from 'framer-motion'
import React from 'react'
import styled from 'styled-components'
import { contentAnimation } from './Sidebar.Animations'
import { Divider } from '@mui/material'
import ContentHeader from './Sidebar.ContentHeader'
import { useTheme } from '@mui/material/styles/'

const Content = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

type SideBarContentProps = {
  children: JSX.Element
}

function SideBarContent(props: SideBarContentProps) {
  const { dark } = useTheme()
  return (
    <Content
      variants={contentAnimation}
      animate="open"
      initial="closed"
      exit="closed"
    >
      <ContentHeader />
      <Divider color={dark.elevation_4} />
      {props.children}
    </Content>
  )
}

export default SideBarContent
