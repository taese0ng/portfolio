import styled from '@emotion/styled';

import BackgroundSetting from './BackgroundSetting';

function Settings() {
  return (
    <Container>
      <BackgroundSetting />
    </Container>
  );
}

export default Settings;

const Container = styled.div`
  background: var(--gray-20);
  height: 100%;
  overflow: auto;
`;
