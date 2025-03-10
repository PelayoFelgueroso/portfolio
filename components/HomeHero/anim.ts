export const slideUp = (multiplayer: number) => ({
  initial: {
    y: "300px",
  },
  entry:{
    y: "0%",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 1.2 * multiplayer },
  },
});
