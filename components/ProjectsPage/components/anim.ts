export const cardSlideUp = {
  initial: {
    translateY: "100px",
    rotateY: "45deg",
    opacity: 0,
  },
  inView: {
    translateY: "0px",
    rotateY: "0deg",
    opacity: 1,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};
