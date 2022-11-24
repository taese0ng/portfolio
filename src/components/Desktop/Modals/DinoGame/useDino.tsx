import { useCallback, useEffect, useRef, useState } from 'react';

import { Obstacle } from '@interfaces/dinoGame';
import { cloneDeep } from 'lodash';

const gravity = 10;
const dinoSize = {
  width: 80,
  height: 100,
};
const obstacle: Obstacle = {
  width: 30,
  height: 30,
  x: 0,
  y: 0,
};
const obstacls: Obstacle[] = [obstacle];
const jumpTimer = 300;

function useDino() {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const timeout = useRef<NodeJS.Timeout>();
  const dinoY = useRef(0);
  const jumpY = useRef(0);
  const test = useRef(false);

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

    obstacls.forEach((o) => {
      if (o.x > 0) {
        o.x -= gravity;
      } else if (o.x < 0) {
        o.x = 0;
      }

      drawObstacle(o);
    });
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
      ctx.fillRect(200, dinoY.current, dinoSize.width, dinoSize.height);
      ctx.fill();
      ctx.closePath();
    }
  };

  const drawObstacle = (o: Obstacle) => {
    const ctx = canvas?.getContext('2d');

    if (o.x === 0) {
      ctx?.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    } else if (ctx) {
      ctx.fillStyle = 'blue';
      ctx.beginPath();
      ctx.fillRect(o.x, ctx.canvas.clientHeight - o.height - o.y, o.width, o.height);
      ctx.fill();
      ctx.closePath();
    }
  };

  const jump = (e: KeyboardEvent) => {
    const context = canvas?.getContext('2d');

    switch (e.code) {
      case 'Space':
        if (context && !test.current) {
          clearTimeout(timeout.current);
          test.current = true;
          const height = (context.canvas.height || 0) - dinoSize.height;

          jumpY.current = 0;
          timeout.current = setTimeout(() => {
            jumpY.current = height;

            setTimeout(() => {
              test.current = false;
            }, jumpTimer);
          }, jumpTimer);
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

      setInterval(() => {
        const tempObstacle = cloneDeep(obstacle);
        tempObstacle.x = context?.canvas.width || 0;
        obstacls.push(tempObstacle);
      }, 1000);

      animationFrameId = window.requestAnimationFrame(update);
    }

    window.addEventListener('keydown', jump);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('keydown', jump);
    };
  }, [canvas]);

  return { dino };
}

export default useDino;
