import React, { ReactElement, useEffect, useRef, useState } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { DockItemType } from '~/interfaces/dock';

interface Props {
  item: DockItemType;
  onCloseModal: (id: string) => void;
  onUpperModal: (id: string) => void;
  children: ReactElement;
}

function BaseModal({ item, onCloseModal, onUpperModal, children }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [isResizeClicked, setIsResizeClicked] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isIconHover, setIsIconHover] = useState(false);
  const [shiftX, setShiftX] = useState(0);
  const [shiftY, setShiftY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const topSetterRef = useRef<HTMLDivElement>(null);
  const bottomSetterRef = useRef<HTMLDivElement>(null);
  const rightSetterRef = useRef<HTMLDivElement>(null);
  const leftSetterRef = useRef<HTMLDivElement>(null);
  const resizeObj = useRef({
    dir: '',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    height: 0,
    width: 0,
  });
  const containerMinWidth = (item.width || 0) - 100;
  const containerMinHeight = (item.height || 0) - 100;

  const saveResizeObj = () => {
    if (containerRef.current) {
      resizeObj.current.width = parseFloat(containerRef.current.style.width);
      resizeObj.current.height = parseFloat(containerRef.current.style.height);
      resizeObj.current.top = parseFloat(containerRef.current.style.top);
      resizeObj.current.left = parseFloat(containerRef.current.style.left);

      sessionStorage.setItem(`${item.id}LocationCoords`, JSON.stringify(resizeObj.current));
    }
  };

  const onMouseMove = (e: MouseEvent) => {
    if (containerRef.current && !item.isFixed) {
      if (isClicked) {
        containerRef.current.style.left = `${e.pageX - shiftX}px`;
        containerRef.current.style.top = `${e.pageY - shiftY}px`;
      } else if (isResizeClicked) {
        const height = resizeObj.current.bottom - e.pageY;
        const width = resizeObj.current.right - e.pageX;

        switch (resizeObj.current.dir) {
          case 'top':
            if (containerMinHeight < height) {
              containerRef.current.style.top = `${e.pageY}px`;
              containerRef.current.style.height = `${height}px`;
            }
            break;
          case 'bottom':
            containerRef.current.style.height = `${e.pageY - resizeObj.current.top}px`;
            break;
          case 'right':
            containerRef.current.style.width = `${e.pageX - resizeObj.current.left}px`;
            break;
          case 'left':
            if (containerMinWidth < width) {
              containerRef.current.style.left = `${e.pageX}px`;
              containerRef.current.style.width = `${width}px`;
            }
            break;
          case 'rb':
            containerRef.current.style.height = `${e.pageY - resizeObj.current.top}px`;
            containerRef.current.style.width = `${e.pageX - resizeObj.current.left}px`;
            break;
          case 'lb':
            containerRef.current.style.height = `${e.pageY - resizeObj.current.top}px`;
            if (containerMinWidth < width) {
              containerRef.current.style.left = `${e.pageX}px`;
              containerRef.current.style.width = `${width}px`;
            }
            break;
          case 'rt':
            containerRef.current.style.width = `${e.pageX - resizeObj.current.left}px`;
            if (containerMinHeight < height) {
              containerRef.current.style.top = `${e.pageY}px`;
              containerRef.current.style.height = `${height}px`;
            }
            break;
          case 'lt':
            if (containerMinHeight < height) {
              containerRef.current.style.top = `${e.pageY}px`;
              containerRef.current.style.height = `${height}px`;
            }
            if (containerMinWidth < width) {
              containerRef.current.style.left = `${e.pageX}px`;
              containerRef.current.style.width = `${width}px`;
            }
            break;
          default:
            break;
        }
      }
    }
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (containerRef.current) {
      setIsClicked(true);
      setShiftX(e.clientX - containerRef.current.getBoundingClientRect().left);
      setShiftY(e.clientY - containerRef.current.getBoundingClientRect().top);
    }
  };

  const onMouseUp = () => {
    setIsClicked(false);
    setIsResizeClicked(false);
    saveResizeObj();
  };

  const onResizeMouseDown = (dir: string) => {
    setIsResizeClicked(true);
    const bottomSetter = bottomSetterRef.current;
    const topSetter = topSetterRef.current;
    const leftSetter = leftSetterRef.current;
    const rightSetter = rightSetterRef.current;

    if (bottomSetter && topSetter && leftSetter && rightSetter) {
      switch (dir) {
        case 'top':
          resizeObj.current.dir = 'top';
          resizeObj.current.bottom = bottomSetter.getBoundingClientRect().top;
          break;
        case 'bottom':
          resizeObj.current.dir = 'bottom';
          resizeObj.current.top = topSetter.getBoundingClientRect().top;
          break;
        case 'right':
          resizeObj.current.dir = 'right';
          resizeObj.current.left = leftSetter.getBoundingClientRect().left;
          break;
        case 'left':
          resizeObj.current.dir = 'left';
          resizeObj.current.right = rightSetter.getBoundingClientRect().right;
          break;
        case 'rb':
          resizeObj.current.dir = 'rb';
          resizeObj.current.left = leftSetter.getBoundingClientRect().left;
          resizeObj.current.top = topSetter.getBoundingClientRect().top;
          break;
        case 'lb':
          resizeObj.current.dir = 'lb';
          resizeObj.current.right = rightSetter.getBoundingClientRect().right;
          resizeObj.current.top = topSetter.getBoundingClientRect().top;
          break;
        case 'rt':
          resizeObj.current.dir = 'rt';
          resizeObj.current.left = leftSetter.getBoundingClientRect().left;
          resizeObj.current.bottom = bottomSetter.getBoundingClientRect().top;
          break;
        case 'lt':
          resizeObj.current.dir = 'lt';
          resizeObj.current.right = rightSetter.getBoundingClientRect().right;
          resizeObj.current.bottom = bottomSetter.getBoundingClientRect().top;
          break;
        default:
          break;
      }
    }
  };

  const handleCloseModal = () => {
    onCloseModal(item.id);
  };

  const handleUppderModal = () => {
    onUpperModal(item.id);
  };

  const handleMouseEnter = () => {
    setIsIconHover(true);
  };

  const handleMouseLeave = () => {
    setIsIconHover(false);
  };

  useEffect(() => {
    const itemLocationCoords = sessionStorage.getItem(`${item.id}LocationCoords`);

    if (containerRef.current) {
      if (itemLocationCoords && !item.isFixed) {
        resizeObj.current = JSON.parse(itemLocationCoords);
        containerRef.current.style.top = `${resizeObj.current.top}px`;
        containerRef.current.style.left = `${resizeObj.current.left}px`;
        if (item.resizeable) {
          containerRef.current.style.width = `${resizeObj.current.width}px`;
          containerRef.current.style.height = `${resizeObj.current.height}px`;
        }
      }
      containerRef.current.style.minWidth = `${containerMinWidth}px`;
      containerRef.current.style.minHeight = `${containerMinHeight}px`;

      setTimeout(
        () => {
          setIsVisible(true);
        },
        item.nowOpen ? 0 : 900,
      );
    }
  }, [containerRef]);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isClicked, isResizeClicked]);

  return (
    <Container
      ref={containerRef}
      onMouseDown={handleUppderModal}
      isVisible={!isVisible}
      width={item.width || 500}
      height={item.height || 300}
      zIndex={item.zIndex}
      position={item?.position}
      isFull={item?.isFull}
    >
      {item.resizeable && (
        <>
          <TopSetter
            ref={topSetterRef}
            onMouseDown={() => onResizeMouseDown('top')}
            onMouseUp={onMouseUp}
          />
          <BottomSetter
            ref={bottomSetterRef}
            onMouseDown={() => onResizeMouseDown('bottom')}
            onMouseUp={onMouseUp}
          />
          <RightSetter
            ref={rightSetterRef}
            onMouseDown={() => onResizeMouseDown('right')}
            onMouseUp={onMouseUp}
          />
          <LeftSetter
            ref={leftSetterRef}
            onMouseDown={() => onResizeMouseDown('left')}
            onMouseUp={onMouseUp}
          />
          <RBSetter onMouseDown={() => onResizeMouseDown('rb')} onMouseUp={onMouseUp} />
          <LBSetter onMouseDown={() => onResizeMouseDown('lb')} onMouseUp={onMouseUp} />
          <RTSetter onMouseDown={() => onResizeMouseDown('rt')} onMouseUp={onMouseUp} />
          <LTSetter onMouseDown={() => onResizeMouseDown('lt')} onMouseUp={onMouseUp} />
        </>
      )}

      <Header
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        absoluteHeader={item?.isAbsoluteHeader || false}
      >
        <Circle
          onClick={handleCloseModal}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <CircleIcon isHover={isIconHover}>ⅹ</CircleIcon>
        </Circle>
        {!item.isAbsoluteHeader && item.title}
      </Header>

      <Body>{children}</Body>
    </Container>
  );
}

export default BaseModal;

const Container = styled.div<{
  isVisible: boolean;
  width: number;
  height: number;
  zIndex: number;
  position?: { x: number; y: number };
  isFull?: boolean;
}>`
  position: absolute;
  ${({ position, width }) =>
    position
      ? css`
          left: ${position.x}px;
          top: ${position.y}px;
        `
      : css`
          left: calc(50% - ${width}px / 2);
          top: calc(20%);
        `}
  ${({ isFull, width, height }) =>
    isFull
      ? css`
          width: 100%;
          height: calc(100% - 105px);
          left: 0px;
          top: 25px;
        `
      : css`
          width: ${width}px;
          height: ${height}px;
        `}
  border-radius: 8px;
  overflow: hidden;

  border: 1px solid var(--gray-50);
  z-index: ${({ zIndex }) => zIndex};
  visibility: ${({ isVisible }) => (isVisible ? 'hidden' : 'visible')};
`;

const Header = styled.div<{ absoluteHeader: boolean }>`
  width: 100%;
  height: 30px;
  background-color: var(--gray-10);
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid var(--gray-50);
  -webkit-touch-callout: none;
  user-select: none;

  ${({ absoluteHeader }) =>
    absoluteHeader &&
    css`
      z-index: var(--absoluteHeader);
      position: absolute;
      top: 0;
      background-color: var(--transparent);
      border: none;
    `}
`;

const Body = styled.div`
  width: 100%;
  height: calc(100% - 30px);
  border-radius: inherit;
`;

const Circle = styled.div`
  border-radius: 100%;
  width: 13px;
  height: 13px;
  display: flex;
  justify-content: center;
  background: var(--red-10);
  cursor: pointer;
  position: absolute;
  left: 15px;
`;

const CircleIcon = styled.div<{ isHover: boolean }>`
  position: relative;
  display: ${({ isHover }) => (isHover ? 'unset' : 'none')};
  top: 50%;
  font-size: 10px;
  transform: translateY(-50%);
`;

const Setter = styled.div`
  position: absolute;
  z-index: calc(var(--absoluteHeader) + 1);
  background-color: transparent;
`;

const TopSetter = styled(Setter)`
  top: 0;
  width: 100%;
  height: 4px;
  cursor: n-resize;
`;

const BottomSetter = styled(Setter)`
  bottom: 0;
  width: 100%;
  height: 4px;
  cursor: s-resize;
`;

const RightSetter = styled(Setter)`
  right: 0;
  width: 4px;
  height: 100%;
  cursor: e-resize;
`;

const LeftSetter = styled(Setter)`
  left: 0;
  width: 4px;
  height: 100%;
  cursor: w-resize;
`;

const RBSetter = styled(Setter)`
  right: 0;
  bottom: 0;
  width: 10px;
  height: 10px;
  cursor: se-resize;
`;

const LBSetter = styled(Setter)`
  left: 0;
  bottom: 0;
  width: 10px;
  height: 10px;
  cursor: sw-resize;
`;

const RTSetter = styled(Setter)`
  right: 0;
  top: 0;
  width: 10px;
  height: 10px;
  cursor: ne-resize;
`;

const LTSetter = styled(Setter)`
  left: 0;
  top: 0;
  width: 10px;
  height: 10px;
  cursor: nw-resize;
`;
