import { Palette } from '../../../assets/styles/theme'

const sidebarAnimation = {
  open: (screenSize: number) => ({
    width: screenSize <= 600 ? '220px' : '250px',
    height: '50vh',
    backgroundColor: Palette.colors.grey.elevation_0,
    transition: {
      height: { delay: 0.5 },
      backgroundColor: { delay: 0.2 },
      type: 'spring',
      damping: 20,
      stiffness: 150,
      mass: 1
    }
  }),
  closed: (screenSize: number) => ({
    width: screenSize <= 600 ? '64px' : '70px',
    height: screenSize <= 600 ? '48px' : '85px',
    backgroundColor: Palette.colors.secondary.dark.elevation_4,
    transition: {
      width: { delay: 0.5 },
      height: { delay: 0.2 },
      backgroundColor: { delay: 0.2 },
      type: 'spring',
      damping: 20,
      stiffness: 150,
      mass: 1
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
