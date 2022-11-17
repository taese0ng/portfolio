import { Children, useEffect } from 'react';

import { Layout } from '@components/Mobile';
import { mobileImgs } from '@constants/bgSetting';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { BgImg } from '@interfaces/bgSetting';
import { mobileBgImgAtom } from '~/store';
import { useRecoilState } from 'recoil';

function Settings() {
  const [mobileBgImg, setMobilBgImg] = useRecoilState(mobileBgImgAtom);
  const handleSelectBg = (bg: BgImg) => {
    setMobilBgImg(bg);
    localStorage.setItem('mobileBackground', JSON.stringify(bg));
  };

  useEffect(() => {
    const localStorageBg = localStorage.getItem('mobileBackground');
    const bg = localStorageBg ? JSON.parse(localStorageBg) : null;

    if (bg) {
      setMobilBgImg(bg);
    }
  }, []);

  return (
    <Layout title="환경설정">
      <Backgrounds>
        {Children.toArray(
          mobileImgs.map((bg) => (
            <Item onClick={() => handleSelectBg(bg)}>
              <ItemThumb selected={mobileBgImg.title === bg.title} src={bg.src} alt={bg.title} />
              <ItemTitle selected={mobileBgImg.title === bg.title}>{bg.title}</ItemTitle>
            </Item>
          )),
        )}
      </Backgrounds>
    </Layout>
  );
}

export default Settings;

const Backgrounds = styled.ul`
  margin: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const Item = styled.li`
  height: 90vw;
  text-align: center;
`;

const ItemThumb = styled.img<{ selected: boolean }>`
  border-radius: 15px;
  -webkit-border-radius: 2rem;
  height: 90%;
  width: 100%;
  object-fit: cover;

  ${({ selected }) =>
    selected &&
    css`
      border: 5px solid var(--blue-20);
      width: calc(100% - 10px);
      height: calc(90% - 10px);
    `}
`;

const ItemTitle = styled.div<{ selected: boolean }>`
  height: 10%;
  font-size: 1.1em;
  margin-top: 5px;

  ${({ selected }) =>
    selected &&
    css`
      font-weight: 600;
    `}
`;
