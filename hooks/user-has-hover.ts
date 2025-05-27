import { useEffect, useState } from "react";

export function useHasHover() {
  const [hasHover, setHasHover] = useState(false);

  useEffect(() => {
    const check = () =>
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      window.innerWidth > 992;

    setHasHover(check());

    const resize = () => {
      setHasHover(check());
    };

    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return hasHover;
}
