import { ReactNode, useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import Header from './Header';

const homePath = '/';
const backBtnIcon = process.env.PUBLIC_URL + '/assets/images/icons/backBtn.png';

interface Props {
  title: string;
  children: ReactNode;
}

function Layout({ title, children }: Props) {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const location = pathname + search;
  const [searchParams] = useSearchParams();
  const querystring = [...searchParams];
  const [isApp, setIsApp] = useState(false);

  const checkLocation = () => {
    if (pathname !== homePath) {
      setIsApp(true);
    }
  };
  const handleClickBack = () => {
    const locations = location.split('/').filter((i: string) => i.length > 0);
    const backLocation =
      querystring.length > 0
        ? locations.splice(0, locations.length).join('/')
        : locations.splice(0, locations.length - 1).join('/');

    navigate(`/${backLocation}`, { replace: true });
  };

  useEffect(() => {
    checkLocation();
  }, []);

  return (
    <Container isApp={isApp}>
      <Header blackMode={isApp} />

      {isApp && (
        <AppHeader>
          <BackButton onClick={handleClickBack}>
            <img src={backBtnIcon} alt="backBtn" />
          </BackButton>
          <Title>{title}</Title>
        </AppHeader>
      )}

      <Wrapper isApp={isApp}>{children}</Wrapper>
    </Container>
  );
}

export default Layout;

const Container = styled.div<{ isApp: boolean }>`
  margin: 0;
  padding: 30px 0 0 0;
  height: calc(100vh - 30px);
  width: 100vw;

  ${({ isApp }) =>
    isApp &&
    css`
      background-color: var(--gray-30);
    `}
`;

const Wrapper = styled.div<{ isApp: boolean }>`
  height: 100%;
  width: 100%;
  overflow: auto;

  ${({ isApp }) =>
    isApp &&
    css`
      height: calc(100% - 40px);
    `}
`;

const AppHeader = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
`;

const BackButton = styled.div`
  width: 50px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    height: calc(100% - 15px);
  }
`;

const Title = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 17px;
  color: var(--black);
  font-weight: 500;
`;
