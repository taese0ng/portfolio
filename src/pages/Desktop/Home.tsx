import { useEffect } from 'react';

import { itemList } from '@constants/dock';
import styled from '@emotion/styled';
import { DockItemType } from '@interfaces/dock';
import { Dock, Header } from '~/components/Desktop';
import { bgImgAtom } from '~/store';
import { useRecoilState } from 'recoil';

function Home() {
  const [bgImg, setBgImg] = useRecoilState(bgImgAtom);

  const handleOpenModal = (id: string, nowOpen = false) => {
    const index = itemList.findIndex((item: DockItemType) => item.id === id);
    const zIndexs = itemList.map((item: DockItemType) => item.zIndex);

    itemList[index].zIndex = Math.max(...zIndexs) + 1;
    itemList[index].isOpen = true;
    itemList[index].nowOpen = nowOpen;
  };

  const handleCloseModal = (id: string) => {
    const index = itemList.findIndex((item: DockItemType) => item.id === id);

    itemList[index].zIndex = 0;
    itemList[index].isOpen = false;
  };

  const handleUpperModal = (id: string) => {
    const index = itemList.findIndex((item: DockItemType) => item.id === id);
    const zIndexs = itemList.map((item: DockItemType) => item.zIndex);
    const maxIndex = Math.max(...zIndexs);

    if (itemList[index].zIndex < maxIndex) {
      itemList[index].zIndex = maxIndex + 1;
    }
  };

  useEffect(() => {
    const settedBg = localStorage.getItem('background');

    if (settedBg) setBgImg(JSON.parse(settedBg));
  }, []);

  return (
    <Container>
      <Header itemList={itemList} onOpenModal={handleOpenModal} onUpperModal={handleUpperModal} />
      <BackgroundImg src={bgImg.src} alt="background" draggable="false" />

      {/* {itemList.map((item) => {
        item.isOpen && (
          <BaseModal
            item="{item}"
            absoluteHeader="{item?.isAbsoluteHeader}"
            nowOpen="{item.nowOpen}"
            onCloseModal="{handleCloseModal}"
            onUpperModal="{handleUpperModal}"
          >
            <svelte:component this="{item.component}" />
          </BaseModal>
        );
      })} */}
      <Dock itemList={itemList} onOpenModal={handleOpenModal} onUpperModal={handleUpperModal} />
    </Container>
  );
}

export default Home;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const BackgroundImg = styled.img`
  position: absolute;
  top: 0;
  object-fit: cover;
  width: 100%;
  height: 100%;
  z-index: var(--background);
  -webkit-touch-callout: none;
  user-select: none;
`;
