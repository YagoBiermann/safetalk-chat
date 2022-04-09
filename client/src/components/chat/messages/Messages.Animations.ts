const MessageDisconnectedAnimation = {
  animate: {
    opacity: [0, 0.5, 1],
    transition: {
      ease: 'easeInOut',
      duration: 0.3
    }
  },
  initial: { opacity: 0 },
  exit: {
    opacity: [0, 0.5, 1],
    transition: {
      opacity: { delay: 0.3, duration: 0.25, ease: 'easeInOut' }
    }
  }
}

export { MessageDisconnectedAnimation }
