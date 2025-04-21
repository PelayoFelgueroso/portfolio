export const menuSlideIn = {
  initial: {
    opacity: 0,
  },
  open: {
    opacity: 1,
    transition: { duration: 0.25, delay: 0.25 },
  },
  close: { opacity: 0, transition: { duration: 0.25 } },
};

export const filterSlideIn = {
  initial: {
    opacity: 0,
  },
  open: {
    opacity: 0.9,
    transition: { duration: 0.25 },
  },
  close: { opacity: 0, transition: { duration: 0.25, delay: 0.25 } },
};
