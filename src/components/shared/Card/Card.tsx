import { ReactNode } from 'react';

import styled from '@emotion/styled';

interface Props {
  children: ReactNode;
}

function Card({ children }: Props) {
  return (
    <Container>
      <CardLabel />

      <div>{children}</div>
    </Container>
  );
}

export default Card;

const Container = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  background-color: var(--white);
  padding: 10px 10px 10px 20px;
`;

const CardLabel = styled.span`
  position: absolute;
  height: 100%;
  width: 8px;
  top: 0;
  left: 0;
  background-color: var(--blue-20);
`;
