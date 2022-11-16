import { MouseEvent, ReactNode, useEffect } from 'react';

import styled from '@emotion/styled';

const closeIcon = process.env.PUBLIC_URL + '/assets/images/icons/closeIcon.png';

interface Props {
  onClosePopup: (e?: MouseEvent) => void;
  hasCloseBtn?: boolean;
  children: ReactNode;
}

function Popup({ onClosePopup, hasCloseBtn = false, children }: Props) {
  const handleClosePopup = (e?: MouseEvent) => {
    onClosePopup(e);
  };

  const handleClickSlot = (e: MouseEvent) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const dock: HTMLDivElement | null = document.querySelector('#dock');
    const header: HTMLDivElement | null = document.querySelector('#header');

    if (header && dock) {
      header.style.zIndex = '0';
      dock.style.zIndex = '-1';
    }

    return () => {
      if (header && dock) {
        header.style.zIndex = '70000';
        dock.style.zIndex = '70000';
      }
    };
  }, []);

  return (
    <Container onClick={() => !hasCloseBtn && handleClosePopup()}>
      <SlotWrapper onClick={handleClickSlot}>
        {hasCloseBtn && (
          <CloseBtn onClick={handleClosePopup}>
            <img draggable={false} src={closeIcon} alt="closeBtn" />
          </CloseBtn>
        )}

        {children}
      </SlotWrapper>
    </Container>
  );
}

export default Popup;

const Container = styled.div`
  background-color: var(--black-50per);
  backdrop-filter: blur(10px);
  z-index: var(--dialogBg);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SlotWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;

const CloseBtn = styled.div`
  position: relative;
  top: -15px;
  left: 15px;
  width: 30px;
  height: 30px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }
`;
