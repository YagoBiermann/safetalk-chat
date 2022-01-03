import { Palette } from '../../../assets/styles/theme'

const sideBarVariants = {
  open: {
    width: '220px',
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
  },
  closed: {
    width: '70px',
    height: '85px',
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
  }
}

const sideBarMobileVariants = {
  open: {
    width: '220px',
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
  },
  closed: {
    width: '64px',
    height: '48px',
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
  }
}

const contentVariants = {
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

const badgeVariants = {
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

export {
  sideBarVariants,
  sideBarMobileVariants,
  contentVariants,
  badgeVariants
}
