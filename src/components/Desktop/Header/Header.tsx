import { useState } from 'react';

import { Battery } from '@components/shared';
import { itemIDs } from '@constants/dock';
import styled from '@emotion/styled';
import { DockItemType } from '~/interfaces/dock';

import Calendar from './Calendar';
import Time from './Time';

const logoImg = process.env.PUBLIC_URL + '/assets/images/icons/logo.webp';
const dock: HTMLDivElement | null = document.querySelector('#dock');
const header: HTMLDivElement | null = document.querySelector('#header');

interface Props {
  itemList: Array<DockItemType>;
  onOpenModal: (id: string, nowOpen: boolean) => void;
  onUpperModal: (id: string) => void;
}

function Header({ itemList, onOpenModal, onUpperModal }: Props) {
  const [isFocusedPopup, setIsFocusedPopup] = useState(false);
  const [isOpenedCalendar, setIsOpenedCalendar] = useState(false);

  const handleFocusMenu = () => {
    setIsFocusedPopup(true);
  };

  const handleBlurMenu = () => {
    setTimeout(() => {
      setIsFocusedPopup(false);
    }, 100);
  };

  const handleClickMyInfo = () => {
    const item = itemList.find((item) => item.id === itemIDs.myInfo);
    if (item) {
      if (!item.isOpen) {
        onOpenModal(item.id, true);
      } else {
        onUpperModal(item.id);
      }
    }
  };

  const handleOpenCalendar = () => {
    if (header && dock) {
      header.style.zIndex = '0';
      dock.style.zIndex = '-1';
    }
    setIsOpenedCalendar(true);
  };

  const handleCloseCalendar = () => {
    if (header && dock) {
      header.style.zIndex = '70000';
      dock.style.zIndex = '70000';
    }
    setIsOpenedCalendar(false);
  };

  return (
    <Container id="header">
      <Left>
        <ElementWrapper>
          <LogoWrapper tabIndex={0} onFocus={handleFocusMenu} onBlur={handleBlurMenu}>
            <img draggable={false} src={logoImg} alt="logo" />
          </LogoWrapper>

          {isFocusedPopup && (
            <MenuList>
              <li onClick={handleClickMyInfo}>김태성에 관하여</li>
            </MenuList>
          )}
        </ElementWrapper>
      </Left>
      <Right>
        <ElementWrapper>
          <Element>
            <Battery onPercent={true} blackMode={false} />
          </Element>

          <Element>
            <TimeWrapper onClick={handleOpenCalendar}>
              <Time />
            </TimeWrapper>

            {isOpenedCalendar && (
              <>
                <CalendarWrapper>
                  <Calendar />
                </CalendarWrapper>
                <Dim onClick={handleCloseCalendar} />
              </>
            )}
          </Element>
        </ElementWrapper>
      </Right>
    </Container>
  );
}

export default Header;

const Container = styled.div`
  z-index: var(--top);
  position: absolute;
  background-color: var(--black-30per);
  backdrop-filter: blur(10px);
  width: 100%;
  height: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--white);
`;

const Left = styled.div`
  padding-left: 7px;
  display: flex;
  align-items: center;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  font-weight: 400;
  padding-right: 7px;
  height: 100%;
`;

const Popup = styled.div`
  position: absolute;
  top: 25px;
  z-index: var(--top);
  background-color: var(--black-50per);
  backdrop-filter: blur(10px);
  border-radius: 3px;
  padding: 4px;
`;

const MenuList = styled(Popup)`
  width: 200px;
  margin: 0;

  li {
    list-style: none;
    margin: 0;
    padding: 2px 7px;
    font-size: 13px;
    font-weight: 400;
    border-radius: 3px;
    cursor: pointer;

    &:hover {
      background-color: var(--blue-10);
    }
  }
`;

const CalendarWrapper = styled(Popup)`
  padding: 10px;
  right: 0;
  border-radius: 10px;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  outline: none;
  cursor: pointer;

  img {
    padding: 2px 8px;
    width: 17px;
    height: 17px;
    border-radius: 5px;
    &:hover {
      background-color: var(--white-30per);
    }
  }
`;

const TimeWrapper = styled.div`
  border-radius: 5px;
  cursor: pointer;

  :hover {
    background-color: var(--white-30per);
  }
`;

const ElementWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const Element = styled.div`
  height: 70%;
  display: flex;
  align-items: center;
  margin-left: 5px;
  border-radius: 5px;
  padding: 2px 5px;

  &:hover {
    background-color: $white_30per;
  }
`;

const Dim = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;
