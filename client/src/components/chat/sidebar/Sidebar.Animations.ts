import { alpha } from '@mui/material'
import { appTheme } from '../../../assets/styles/theme'

const sidebarAnimation = {
  open: (screenWidth: number) => ({
    width: screenWidth <= 600 ? '220px' : '250px',
    height: '50vh',
    backgroundColor: appTheme.colors.dark.elevation_4,
    transition: {
      height: { delay: 0.6 },
      backgroundColor: { delay: 0.3 },
      type: 'spring',
      stiffness: 150,
      damping: 25,
      mass: 1,
      bounce: 5
    }
  }),
  closed: (screenWidth: number) => ({
    width: screenWidth <= 600 ? '64px' : '70px',
    height: screenWidth <= 600 ? '48px' : '85px',
    backgroundColor: alpha(appTheme.colors.primary.main, 0.4),
    transition: {
      width: { delay: 0.6 },
      height: { delay: 0.3 },
      backgroundColor: { delay: 0.2 },
      type: 'spring',
      stiffness: 150,
      damping: 25,
      mass: 1,
      bounce: 5
    }
  })
}

const contentAnimation = {
  open: {
    opacity: 1,
    transition: {
      delay: 0.2
    }
  },
  closed: {
    opacity: 0
  }
}

const badgeAnimation = {
  open: {
    opacity: 0,
    transition: {
      delay: 0.2
    }
  },
  closed: {
    opacity: 1
  }
}

const userAnimation = (index: number) => ({
  y: [10, 0],
  opacity: [0, 1],
  transition: {
    duration: 0.5,
    delay: 0.2 * index
  }
})

export { sidebarAnimation, contentAnimation, badgeAnimation, userAnimation }
