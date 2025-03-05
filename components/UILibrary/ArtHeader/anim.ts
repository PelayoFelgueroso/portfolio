export const hoverLink = {
  initial: { y: "0%" },
  hovered: {
    y: ["0%", "-100%", "100%", "0%"], // Aquí el "100%" es el cambio instantáneo
    transition: {
      duration: 0.3, // Duración total de la animación
      times: [0, 0.5, 0.5, 1], // Distribuye las fases de la animación
    },
  },
};

export const slideIn = {
  initial: {
    display: "none",
    x: "100%",
  },
  open: {
    display: "flex",
    x: "0%",
    transition: {
      duration: 0.75,
    },
  },
  close: {
    x: "100%",
    transition: {
      duration: 0.75,
      delay: 0.75,
    },
    transitionEnd: {
      display: "none",
    },
  },
};

export const slideUp = {
  initial: {
    y: "100%",
  },
  open: {
    y: "0%",
    transition: {
      delay: 0.75,
      duration: 0.75,
    },
  },
  close: {
    y: "100%",
    transition: {
      duration: 0.75,
    },
  },
};

export const slideUpLogo = {
  initial: {
    y: "100%",
    opacity: 0,
  },
  open: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 1.25,
      delay: 0.75,
    },
  },
  close: {
    y: "100%",
    opacity: 0,
    transition: {
      duration: 1.25,
    },
  },
};

export const toggleMenu = {
  initial: {
    display: "block",
    opacity: 1,
  },
  isOpen: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
    transitionEnd: {
      display: "none",
    },
  },
  isNotOpen: {
    display: "block",
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.5,
    },
  },
};

export const totoggleClose = {
  initial: {
    display: "none",
    opacity: 0,
  },
  isOpen: {
    display: "block",
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.5,
    },
  },
  isNotOpen: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
    transitionEnd: {
      display: "none",
    },
  },
};
