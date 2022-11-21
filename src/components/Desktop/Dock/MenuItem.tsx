import { MouseEvent, useState } from 'react';

import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { DockItemType } from '~/interfaces/dock';

interface Props {
  item: DockItemType;
  onOpenModal: (id: string) => void;
  onUpperModal: (id: string) => void;
}

function MenuItem({ item, onOpenModal, onUpperModal }: Props) {
  const [isHover, setIsHover] = useState(false);
  const [bounce, setBounce] = useState(false);

  const onClickMenu = (
    e: MouseEvent & { currentTarget: EventTarget & HTMLDivElement },
    item: DockItemType,
  ) => {
    e.preventDefault();
    if (!item.isOpen) {
      setBounce(true);
      setTimeout(() => setBounce(false), 700);

      onOpenModal(item.id);
    } else {
      onUpperModal(item.id);
    }
  };

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };
  return (
    <Container onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <MenuItemTitle isHover={isHover}>{item.title}</MenuItemTitle>

      <MenuItemIcon isBounce={bounce} onClick={(e) => onClickMenu(e, item)}>
        <img draggable={false} src={item.icon} alt={item.title} />
      </MenuItemIcon>

      {item.isOpen && <MenuItemDot></MenuItemDot>}
    </Container>
  );
}

export default MenuItem;

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MenuItemTitle = styled.div<{ isHover: boolean }>`
  display: ${({ isHover }) => (isHover ? 'block' : 'none')};
  position: absolute;
  top: -40px;
  min-width: 60px;
  text-align: center;
  padding: 5px;
  background-color: var(--gray-50);
  border-radius: 8px;
  font-size: 13px;

  &::after {
    border-color: var(--gray-50) transparent;
    border-style: solid;
    border-width: 6px 8px 0 6px;
    content: '';
    display: block;
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    z-index: 1;
  }
`;

/* 바운스의 높이 0% 일 때, 0px 50%일 때, -5px 70%일 때, -50px 100%일 때, 0px */
const bounceKeyFrames = keyframes`
	0% {
		top: 0;
	}

	50% {
		top: -20px;
	}

	100% {
		top: 0;
	}
`;

const MenuItemIcon = styled.div<{ isBounce: boolean }>`
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 10px;
  margin: 0 6px;
  cursor: pointer;
  background-color: transparent;
  background-size: 100%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
  }

  ${({ isBounce }) =>
    isBounce &&
    css`
      animation: ${bounceKeyFrames} 0.6s linear;
    `}
`;

const MenuItemDot = styled.div`
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 100%;
  background: var(--darkBlue-10);
  bottom: -10px;
`;
