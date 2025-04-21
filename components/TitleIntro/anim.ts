export const slideUp = (multiplayer: number) => ({
  initial: {
    y: "300px",
  },
  entry: {
    y: "0%",
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
      delay: 1.2 * multiplayer,
    },
  },
});

export const nameTitleAnim = {
  initial: {
    fliter: "blur(0px)",
    opacity: 1,
    y: "0%",
    skew: "0deg",
  },
  change: {
    filter: "blur(40px)",
    opacity: 0,
    y: "-10%",
    skew: "4deg",
    transition: {
      duration: 0.25,
    },
  },
};

export const changeTitleAnim = {
  initial: {
    filter: "blur(40px)",
    opacity: 0,
    y: "-10%",
    skew: "4deg",
  },
  change: {
    filter: "blur(0px)",
    opacity: 1,
    y: "0%",
    skew: "0deg",
    transition: {
      duration: 0.25,
    },
  },
};
