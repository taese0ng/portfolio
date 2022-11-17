import { Children } from 'react';

import { bgImgs } from '@constants/bgSetting';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { BgImg } from '@interfaces/bgSetting';
import { bgImgAtom } from '~/store';
import { useRecoilState } from 'recoil';

function BackgroundSetting() {
  const [bgImg, setBgImg] = useRecoilState(bgImgAtom);

  const handleSetImg = (bg: BgImg) => {
    setBgImg(bg);
    localStorage.setItem('background', JSON.stringify(bg));
  };

  return (
    <div>
      <Header>
        <Title>배경 설정</Title>
      </Header>

      <div>
        <ItemsWrapper>
          {Children.toArray(
            bgImgs.map((img) => (
              <Item onClick={() => handleSetImg(img)}>
                <ItemImg
                  draggable={false}
                  selected={bgImg.title === img.title}
                  src={img.src}
                  alt=""
                />
                <ItemTitle selected={bgImg.title === img.title}>{img.title}</ItemTitle>
              </Item>
            )),
          )}
        </ItemsWrapper>
      </div>
    </div>
  );
}

export default BackgroundSetting;

const Header = styled.div`
  padding: 10px;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const ItemsWrapper = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  padding: 0 10px;
`;

const Item = styled.li`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  align-items: center;
  cursor: pointer;
`;

const ItemImg = styled.img<{ selected: boolean }>`
  border-radius: 6px;
  width: 100%;
  height: 130px;
  object-fit: cover;

  ${({ selected }) =>
    selected &&
    css`
      width: calc(100% - 8px);
      height: calc(130px - 8px);
      border: 4px solid var(--blue-10);
    `}
`;

const ItemTitle = styled.div<{ selected: boolean }>`
  margin-top: 5px;
  font-size: 15px;
  font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};
`;
