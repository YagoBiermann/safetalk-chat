const filePreviewAnimations = {
  animate: {
    scale: [0, 1.1, 1],
    opacity: [0, 0.5, 1],
    transition: {
      ease: 'easeInOut',
      duration: 0.3
    }
  },
  initial: { opacity: 0, scale: 0 },
  exit: {
    y: [0, -30, 0],
    scale: 0,
    transition: {
      y: { duration: 0.2, ease: 'easeInOut' },
      scale: { delay: 0.3, duration: 0.25 }
    }
  }
}

export { filePreviewAnimations }
