import { motion } from 'framer-motion'

const pathAnimation = {
  animate: (i: number) => ({
    y: [0, -20, 0],
    transition: {
      duration: 0.5,
      delay: i * 0.2,
      ease: 'easeInOut',
      repeatDelay: 0.5,
      repeat: Infinity
    }
  })
}

type AnimatedProps = {
  width?: number
  height?: number
}
const AnimatedLogo = (props: AnimatedProps) => {
  return (
    <motion.svg
      width={props.width || '454'}
      height={props.height || '519'}
      viewBox="0 0 454 519"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        d="M147.021 153.833C150.209 156.927 152 161.124 152 165.5C152 169.876 150.209 174.073 147.021 177.167C143.833 180.262 139.509 182 135 182C130.491 182 126.167 180.262 122.979 177.167C119.791 174.073 118 169.876 118 165.5C118 161.124 119.791 156.927 122.979 153.833C126.167 150.738 130.491 149 135 149C139.509 149 143.833 150.738 147.021 153.833Z"
        fill="white"
        variants={pathAnimation}
        animate="animate"
        custom={1}
      />
      <motion.path
        d="M205.021 153.833C208.209 156.927 210 161.124 210 165.5C210 169.876 208.209 174.073 205.021 177.167C201.833 180.262 197.509 182 193 182C188.491 182 184.167 180.262 180.979 177.167C177.791 174.073 176 169.876 176 165.5C176 161.124 177.791 156.927 180.979 153.833C184.167 150.738 188.491 149 193 149C197.509 149 201.833 150.738 205.021 153.833Z"
        fill="white"
        variants={pathAnimation}
        animate="animate"
        custom={2}
      />
      <motion.path
        d="M263.021 153.833C266.209 156.927 268 161.124 268 165.5C268 169.876 266.209 174.073 263.021 177.167C259.833 180.262 255.509 182 251 182C246.491 182 242.167 180.262 238.979 177.167C235.791 174.073 234 169.876 234 165.5C234 161.124 235.791 156.927 238.979 153.833C242.167 150.738 246.491 149 251 149C255.509 149 259.833 150.738 263.021 153.833Z"
        fill="white"
        variants={pathAnimation}
        animate="animate"
        custom={4}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M227 0C204.624 0 167.234 8.59356 132.049 18.16C100.62 26.8095 69.4035 36.2165 38.428 46.3728C29.5066 49.319 21.5973 54.722 15.6086 61.9613C9.61988 69.2005 5.79474 77.9822 4.5726 87.2976C-14.7548 232.48 30.0939 340.078 84.509 411.259C107.585 441.708 135.098 468.522 166.132 490.806C176.862 498.517 188.232 505.298 200.117 511.074C209.229 515.354 218.958 518.857 227 518.857C235.042 518.857 244.803 515.354 253.883 511.074C265.768 505.297 277.137 498.517 287.868 490.806C318.902 468.523 346.416 441.709 369.491 411.259C423.906 340.078 468.755 232.48 449.427 87.2976C448.205 77.9822 444.38 69.2005 438.391 61.9613C432.403 54.722 424.493 49.319 415.572 46.3728C394.234 39.4007 357.947 27.8886 321.951 18.16C286.766 8.59356 249.376 0 227 0ZM195.402 63C127.972 63 69.0101 110.318 69.0101 173.593C69.0341 191.009 73.6382 208.112 82.3603 223.186L69.7211 263.679C68.9172 266.247 68.7829 268.979 69.331 271.614C69.8791 274.25 71.0914 276.701 72.8528 278.736C74.6143 280.772 76.8665 282.323 79.3959 283.244C81.9252 284.164 84.6478 284.423 87.3054 283.996L144.403 274.833C160.683 281.059 177.972 284.23 195.402 284.186C262.832 284.186 321.794 236.868 321.794 173.593C321.794 110.318 262.832 63 195.402 63ZM152.492 297.078C166.095 300.68 180.519 302.623 195.402 302.623C274.081 302.623 342.854 247.422 342.854 173.593C342.857 166.664 342.243 159.748 341.021 152.928C367.643 172.85 384.99 202.473 384.99 236.789C384.966 254.204 380.362 271.308 371.64 286.382L384.279 326.875C385.083 329.443 385.217 332.175 384.669 334.81C384.121 337.445 382.909 339.897 381.147 341.932C379.386 343.968 377.133 345.519 374.604 346.44C372.075 347.36 369.352 347.619 366.695 347.192L309.597 338.029C293.317 344.256 276.028 347.427 258.598 347.382C215.261 347.382 175.432 327.838 152.492 297.078Z"
        fill="#dcdcdc"
      />
    </motion.svg>
  )
}

export default AnimatedLogo