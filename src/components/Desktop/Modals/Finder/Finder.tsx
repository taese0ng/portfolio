import { useEffect, useRef, useState } from 'react';

import styled from '@emotion/styled';

function Finder() {
  const localStorageWidth = localStorage.getItem('finder_sidebar_width');
  const finderWidth = localStorageWidth ? JSON.parse(localStorageWidth) : 200;
  const containerRef = useRef<HTMLDivElement>(null);
  const [sideBarWidth, setSideBarWidth] = useState(finderWidth);
  const [isClicked, setIsClicked] = useState(false);

  const handleMouseDown = () => {
    setIsClicked(true);
  };

  const handleMouseUp = () => {
    setIsClicked(false);
    localStorage.setItem('finder_sidebar_width', JSON.stringify(sideBarWidth));
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isClicked && containerRef.current) {
      const containerLeft = containerRef.current.getBoundingClientRect().left;
      const sideBarWidth = e.pageX - containerLeft;
      if (sideBarWidth <= 100) {
        setSideBarWidth(100);
      } else if (sideBarWidth >= 450) {
        setSideBarWidth(450);
      } else {
        setSideBarWidth(sideBarWidth);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isClicked]);

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [sideBarWidth]);

  return (
    <Container ref={containerRef}>
      <SideBarWrapper>
        <SideBar width={sideBarWidth}>SideBar</SideBar>

        <WidthSetter onMouseDown={handleMouseDown}></WidthSetter>
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
