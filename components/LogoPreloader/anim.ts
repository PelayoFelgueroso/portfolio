export const opacity = {
  initial: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
    transition: { duration: 1, delay: 3 },
  },
};

export const slideUp = {
  initial: {
    y: 0,
  },
  exit: {
    y: "-100vh",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0 },
  },
};

export const slideLeft = {
  initial: {
    x: "-100%",
  },
  enter: {
    x: "0%",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
  },
};

export const slideRight = {
  initial: {
    x: "100%",
  },
  enter: {
    x: "0%",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
  },
};
