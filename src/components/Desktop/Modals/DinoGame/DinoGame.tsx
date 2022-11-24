import { useRef } from 'react';

import styled from '@emotion/styled';

import useDino from './useDino';

function DinoGame() {
  const { dino } = useDino();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <Container ref={containerRef}>
      <Info>Press &quot;Space&quot;</Info>
      <Canvas
        ref={dino}
        width={containerRef?.current?.clientWidth}
        height={(containerRef.current?.clientHeight || 0) - 50}
      />
    </Container>
  );
}

export default DinoGame;

const Container = styled.div`
  height: 100%;
  background-color: var(--gray-20);
`;

const Info = styled.div`
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.5em;
  font-weight: 700;
`;

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
`;
