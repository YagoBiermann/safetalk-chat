const ButtonAnimation = {
  animate: { y: -3, transition: { duration: 0.1 } }
}

const syncButtonsAnimation = {
  click: (i: number) => ({
    y: [0, -10, 0],
    scale: [1, 1.1, 1],
    transition: {
      delay: i * 0.1,
      duration: 0.3
    }
  })
}

export { ButtonAnimation, syncButtonsAnimation }
