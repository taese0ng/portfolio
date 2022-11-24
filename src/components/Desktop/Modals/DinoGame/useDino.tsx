import { useCallback, useEffect, useRef, useState } from 'react';

const gravity = 10;
const dinoSize = {
  width: 80,
  height: 100,
};

function useDino() {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const dinoY = useRef(0);
  const jumpY = useRef(0);

  const dino = useCallback((node: HTMLCanvasElement) => {
    if (node) {
      setCanvas(node);
    }
  }, []);

  const animate = () => {
    const context = canvas?.getContext('2d');
    const height = (context?.canvas.height || 0) - dinoSize.height;
    if (dinoY.current > jumpY.current) {
      dinoY.current -= gravity;
    } else if (dinoY.current < jumpY.current && dinoY.current < height) {
      dinoY.current += gravity;
    }

    drawDino();
  };

  const update = () => {
    const ctx = canvas?.getContext('2d');
    if (ctx) {
      requestAnimationFrame(update);
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      animate();
    }
  };

  const drawDino = () => {
    const ctx = canvas?.getContext('2d');

    if (ctx) {
      ctx.fillStyle = 'red';
      ctx.beginPath();
      ctx.fillRect(100, dinoY.current, dinoSize.width, dinoSize.height);
      ctx.fill();
    }
  };

  const jump = (e: KeyboardEvent) => {
    const context = canvas?.getContext('2d');
    switch (e.code) {
      case 'Space':
        if (context) {
          const height = (context.canvas.height || 0) - dinoSize.height;

          jumpY.current = 0;
          setTimeout(() => {
            jumpY.current = height;
          }, 300);
        }
        break;

      case 'ArrowDown':
        console.log('arrowDown');
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    let animationFrameId: number;

    if (canvas && dinoY) {
      const context = canvas?.getContext('2d');
      const height = (context?.canvas.height || 0) - dinoSize.height;
      dinoY.current = height;
      jumpY.current = height;

      animationFrameId = requestAnimationFrame(update);
    }

    window.addEventListener('keydown', jump);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('keydown', jump);
    };
  }, [canvas]);

  return { dino };
}

export default useDino;
