import styled from '@emotion/styled';

function Error() {
  return (
    <Container>
      <Icon draggable={false} src="{infoIcon}" alt="info" />
      <Title>
        잘못된 접근입니다.
        <br />
        <a href="/">Home</a>으로 이동해주세요.
      </Title>
    </Container>
  );
}

export default Error;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.img`
  width: 100px;
  height: 100px;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 600;
  margin: 30px;
  text-align: center;
`;
