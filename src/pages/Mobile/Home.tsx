import { useLayoutEffect } from 'react';

import { Background, Dock, Layout } from '@components/Mobile';
import { itemIDs, itemList } from '@constants/dock';
import styled from '@emotion/styled';
import { DockItemType } from '@interfaces/dock';
import { mobileBgImgAtom } from '~/store';
import { useRecoilState } from 'recoil';

const localStorageBgImg = localStorage.getItem('mobileBackground');
const bg = localStorageBgImg ? JSON.parse(localStorageBgImg) : null;
const dockItemIds = [itemIDs.myInfo, itemIDs.histories, itemIDs.settings];
const dockItems: DockItemType[] = [];
const backgroundItems: DockItemType[] = [];

itemList.forEach((item) => {
  for (let i = 0; i < dockItemIds.length; i++) {
    if (dockItemIds[i] === item.id) {
      return dockItems.push(item);
    }
  }
  return backgroundItems.push(item);
});

function Home() {
  const [mobileBgImg, setMobileBgImg] = useRecoilState(mobileBgImgAtom);

  useLayoutEffect(() => {
    if (bg) {
      setMobileBgImg(bg);
    }
  }, []);

  return (
    <Layout title={'home'}>
      <Wrapper>
        <BgImg src={mobileBgImg.src} alt="bgImg" className="bgImg" draggable="false" />

        <Background items={backgroundItems} />

        <Dock dockItems={dockItems} />
      </Wrapper>
    </Layout>
  );
}

export default Home;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const BgImg = styled.img`
  position: absolute;
  z-index: var(--background);
  top: 0;
  left: 0;
  background-size: cover;
  width: 100%;
  height: 100%;
`;
