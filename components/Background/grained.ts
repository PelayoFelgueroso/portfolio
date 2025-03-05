'use client';

interface GrainedOptions {
  animate?: boolean;
  patternWidth?: number;
  patternHeight?: number;
  grainOpacity?: number;
  grainDensity?: number;
  grainWidth?: number;
  grainHeight?: number;
  grainChaos?: number;
  grainSpeed?: number;
}

export default function grained(element: string | HTMLElement, opt: GrainedOptions = {}) {
  if (typeof window === 'undefined') return;

  const elementRef =
    typeof element === 'string' ? document.getElementById(element.replace('#', '')) : element;
  if (!elementRef) {
    console.error(`Grained: cannot find the element with id ${element}`);
    return;
  }

  if (elementRef.style.position !== 'absolute') {
    elementRef.style.position = 'relative';
  }
  elementRef.style.overflow = 'hidden';

  const options: GrainedOptions = {
    animate: true,
    patternWidth: 100,
    patternHeight: 100,
    grainOpacity: 0.1,
    grainDensity: 1,
    grainWidth: 1,
    grainHeight: 1,
    grainChaos: 0.5,
    grainSpeed: 20,
    ...opt,
  };

  const generateNoise = (): string => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    canvas.width = options.patternWidth!;
    canvas.height = options.patternHeight!;

    for (let w = 0; w < options.patternWidth!; w += options.grainDensity!) {
      for (let h = 0; h < options.patternHeight!; h += options.grainDensity!) {
        const rgb = (Math.random() * 256) | 0;
        ctx.fillStyle = `rgba(${rgb}, ${rgb}, ${rgb}, ${options.grainOpacity})`;
        ctx.fillRect(w, h, options.grainWidth!, options.grainHeight!);
      }
    }
    return canvas.toDataURL('image/png');
  };

  const noise = generateNoise();
  elementRef.style.backgroundImage = `url(${noise})`;
}
