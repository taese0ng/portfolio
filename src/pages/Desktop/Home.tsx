import { Children, useEffect, useState } from 'react';

import { itemList } from '@constants/dock';
import styled from '@emotion/styled';
import { DockItemType } from '@interfaces/dock';
import { Dock, Header, Modals } from '~/components/Desktop';
import { bgImgAtom } from '~/store';
import { useRecoilState } from 'recoil';

function Home() {
  const [bgImg, setBgImg] = useRecoilState(bgImgAtom);
  const [items, setItems] = useState(itemList);

  const handleOpenModal = (id: string, nowOpen = false) => {
    const tempItems = items.map((item) => item);
    const index = tempItems.findIndex((item: DockItemType) => item.id === id);
    const zIndexs = tempItems.map((item: DockItemType) => item.zIndex);

    tempItems[index].zIndex = Math.max(...zIndexs) + 1;
    tempItems[index].isOpen = true;
    tempItems[index].nowOpen = nowOpen;

    setItems(tempItems);
  };

  const handleCloseModal = (id: string) => {
    const tempItems = items.map((item) => item);
    const index = tempItems.findIndex((item: DockItemType) => item.id === id);

    tempItems[index].zIndex = 0;
    tempItems[index].isOpen = false;
    setItems(tempItems);
  };

  const handleUpperModal = (id: string) => {
    const tempItems = items.map((item) => item);
    const index = tempItems.findIndex((item: DockItemType) => item.id === id);
    const zIndexs = tempItems.map((item: DockItemType) => item.zIndex);
    const maxIndex = Math.max(...zIndexs);

    if (tempItems[index].zIndex < maxIndex) {
      tempItems[index].zIndex = maxIndex + 1;
      setItems(tempItems);
    }
  };

  useEffect(() => {
    const settedBg = localStorage.getItem('background');

    if (settedBg) setBgImg(JSON.parse(settedBg));
  }, []);

  return (
    <Container>
      <>
        <Header itemList={items} onOpenModal={handleOpenModal} onUpperModal={handleUpperModal} />
        <BackgroundImg src={bgImg.src} alt="background" draggable="false" />

        {Children.toArray(
          items.map(
            (item) =>
              item.isOpen && (
                <Modals.BaseModal
                  item={item}
                  onCloseModal={handleCloseModal}
                  onUpperModal={handleUpperModal}
                >
                  <item.component />
                </Modals.BaseModal>
              ),
          ),
        )}

        <Dock itemList={items} onOpenModal={handleOpenModal} onUpperModal={handleUpperModal} />
      </>
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
