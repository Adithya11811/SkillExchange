export const staggerChildren = {
  animate: {
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.1,
    },
  },
}

export const wordAnimation = {
  initial: {
    x: -500,
    
  },
  animate: {
    x: 0,
    transition: {
      ease: [0.8, 0.01, 0.05, 0.95],
      duration: 2,
    },
  },
}

export const riseWithFade = {
  initial: {
    x: -100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      ease: [0.6, 0.01, 0.05, 0.95],
      duration: 0.7,
    },
  },
}

export const videoAnimation = {
  initial: {
    y: 100,
    opacity: 0,
    scale: 0.8,
  },
  animate: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      ease: [0.6, 0.01, 0.05, 0.95],
      duration: 1,
    },
  },
}

export  const cardVariants = {
    initial: { y: 100, opacity: 0, scale: 0.8 },
    animate: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        ease: [0.6, 0.01, 0.05, 0.95],
        duration: 1,
      },
    },
  }

