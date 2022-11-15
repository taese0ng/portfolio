import { useEffect, useRef, useState } from 'react';

import styled from '@emotion/styled';

const localStorageWidth = localStorage.getItem('finder_sidebar_width');
const finderWidth = localStorageWidth ? JSON.parse(localStorageWidth) : 200;

function Finder() {
  const containerRef = useRef<HTMLDivElement>(null);
  const widthSetterRef = useRef<HTMLSpanElement>(null);
  const [width, setWidth] = useState(finderWidth);
  const [isClicked, setIsClicked] = useState(false);

  const onMouseDown = () => {
    setIsClicked(true);
  };

  const onMouseUp = () => {
    setIsClicked(false);
    localStorage.setItem('finder_sidebar_width', JSON.stringify(width));
  };

  const onMouseMove = (e: MouseEvent) => {
    if (isClicked && containerRef.current) {
      const containerLeft = containerRef.current.getBoundingClientRect().left;
      const sideBarWidth = e.pageX - containerLeft;
      if (sideBarWidth <= 100) {
        setWidth(100);
      } else if (sideBarWidth >= 450) {
        setWidth(450);
      } else {
        setWidth(sideBarWidth);
      }
    }
  };

  useEffect(() => {
    widthSetterRef.current?.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      widthSetterRef.current?.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isClicked]);

  return (
    <Container ref={containerRef}>
      <SideBarWrapper>
        <SideBar width={width}>SideBar</SideBar>

        <WidthSetter ref={widthSetterRef}></WidthSetter>
      </SideBarWrapper>

      <BodyWrapper>
        <Header>Finder</Header>
        <Body>Finder</Body>
      </BodyWrapper>
    </Container>
  );
}

export default Finder;

const Container = styled.div`
  display: flex;
  height: calc(100% + 30px);
`;

const SideBarWrapper = styled.div`
  position: relative;
  backdrop-filter: blur(15px);
  background-color: var(--white-70per);
  padding-top: 30px;
`;

const SideBar = styled.div<{ width: number }>`
  width: ${({ width }) => width}px;
`;

const WidthSetter = styled.span`
  position: absolute;
  right: -5px;
  top: 0;
  height: 100%;
  width: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: e-resize;
`;

const BodyWrapper = styled.div`
  width: 100%;
`;

const Header = styled.div`
  width: 100%;
  height: 30px;
  background-color: var(--gray-30);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Body = styled.div`
  height: calc(100% - 30px);
  background-color: var(--white);
`;
