export const blurryChar = (initialY: number) => ({
  initial: {
    opacity: 0,
    filter: "blur(10px)",
    y: `${initialY}%`,
  },
  open: {
    opacity: 1,
    filter: "blur(0px)",
    y: "0%",
  },
  close: { opacity: 0, filter: "blur(10px)", y: "40%" },
});
