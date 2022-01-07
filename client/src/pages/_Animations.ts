const PageAnimation = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1
  },
  exit: {
    opacity: 0,
    x: -5000,
    transition: {
      duration: 0.3,
      ease: 'easeInOut'
    }
  }
}

export { PageAnimation }
