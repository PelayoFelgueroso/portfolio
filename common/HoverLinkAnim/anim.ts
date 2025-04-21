export const hoverAnimUp = (delay: number) => ({
  initial: {
    y: "-100%",
  },
  onHover: {
    y: ["0%", "-100%"],
    transition: {
      duration: 0.3,
      times: [0, 1],
      delay: delay,
    },
  },
});

export const hoverAnimDown = (delay: number) => ({
  initial: {
    y: "0%",
  },
  onHover: {
    y: ["100%", "0%"],
    transition: {
      duration: 0.3,
      times: [0, 1],
      delay: delay,
    },
  },
});
