import { Battery } from '@components/shared';
import styled from '@emotion/styled';

import Time from './Time';

interface Props {
  blackMode: boolean;
}

function Header({ blackMode = false }: Props) {
  return (
    <Container>
      <Wrapper>
        <Time blackMode={blackMode} />
        <Battery onPercent blackMode={blackMode} />
      </Wrapper>
    </Container>
  );
}

export default Header;

const Container = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  background-color: var(--white-40per);
  backdrop-filter: blur(20px);
  height: 30px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 10px;
`;
