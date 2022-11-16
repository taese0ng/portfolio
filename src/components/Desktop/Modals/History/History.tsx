import { Children, useEffect, useRef, useState } from 'react';

import { Card } from '@components/shared';
import { historyList } from '@constants/history';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { History as HistoryType } from '@interfaces/history';

const clockIcon = process.env.PUBLIC_URL + '/assets/images/icons/clock.png';
const years = historyList
  .filter(
    (history, idx, originList) =>
      idx ===
      originList.findIndex((item) => item.from.getFullYear() === history.from.getFullYear()),
  )
  .map((history) => history.from.getFullYear());

function History() {
  const localStorageWidth = localStorage.getItem('history_sidebar_width');
  const historySideBartWidth = localStorageWidth ? JSON.parse(localStorageWidth) : 200;
  const containerRef = useRef<HTMLDivElement>(null);
  const bodyWrapperRef = useRef<HTMLDivElement>(null);
  const [isClicked, setIsClicked] = useState(false);
  const [sideBarWidth, setSideBarWidth] = useState(historySideBartWidth);
  const [selectedHistory, setSelectedHistory] = useState<Array<HistoryType>>([]);
  const [selectedYear, setSelectedYear] = useState(years[0]);

  const handleMouseDown = () => {
    setIsClicked(true);
  };

  const handleMouseUp = () => {
    setIsClicked(false);
    localStorage.setItem('history_sidebar_width', JSON.stringify(sideBarWidth));
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isClicked && containerRef.current && bodyWrapperRef.current) {
      const containerLeft = containerRef.current.getBoundingClientRect().left;
      const tempSideBarWidth = e.pageX - containerLeft;
      if (tempSideBarWidth <= 100) {
        setSideBarWidth(100);
      } else if (tempSideBarWidth < bodyWrapperRef.current.clientWidth / 2) {
        setSideBarWidth(tempSideBarWidth);
      }
    }
  };

  const getHistoryList = () => {
    const history = historyList.filter((history) => history.from.getFullYear() === selectedYear);

    setSelectedHistory(history);
  };

  const handleClickYear = (year: number) => {
    setSelectedYear(year);
  };

  const getDate = (history: HistoryType) => {
    const year = history.from.getFullYear();
    const month = history.from.getMonth() + 1;
    return `${year}-${month < 10 ? `0${month}` : month}`;
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isClicked]);

  useEffect(() => {
    getHistoryList();
  }, [selectedYear]);

  return (
    <Container ref={containerRef}>
      <SideBarWrapper>
        <SideBar width={sideBarWidth}>
          <SideBarCategory>연도</SideBarCategory>
          <ul>
            {Children.toArray(
              years.map((year) => (
                <SideBarItem
                  onClick={() => handleClickYear(year)}
                  isFocused={selectedYear === year}
                >
                  {year}년
                </SideBarItem>
              )),
            )}
          </ul>
        </SideBar>

        <WidthSetter onMouseDown={handleMouseDown}></WidthSetter>
      </SideBarWrapper>

      <BodyWrapper ref={bodyWrapperRef}>
        <Header>히스토리</Header>
        <Body>
          <Histories>
            {Children.toArray(
              selectedHistory.map((history) => (
                <li>
                  <Card>
                    <div>
                      <HistoryTitle>{history.title}</HistoryTitle>
                      <HistoryDate>
                        <img draggable={false} src={clockIcon} alt="clock" />
                        {getDate(history)}
                      </HistoryDate>
                      <HistoryContent>{history.content}</HistoryContent>
                    </div>
                  </Card>
                </li>
              )),
            )}
          </Histories>
        </Body>
      </BodyWrapper>
    </Container>
  );
}

export default History;

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
  padding: 0 10px;
`;

const SideBarCategory = styled.div`
  padding: 5px;
  font-size: 15px;
  font-weight: bold;
  color: var(--gray-90);
  margin: 5px 0;
`;

const SideBarItem = styled.li<{ isFocused: boolean }>`
  cursor: pointer;
  padding: 5px;
  border-radius: 8px;
  margin: 2px 0;

  ${({ isFocused }) =>
    isFocused &&
    css`
      background-color: var(--gray-20per);
      font-weight: 600;
    `}

  :hover {
    background-color: var(--gray-20per);
  }
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
  background-color: var(--gray-20);
`;

const Histories = styled.ul`
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  padding: 15px;
  gap: 15px;
`;

const HistoryTitle = styled.div`
  font-size: 22px;
  font-weight: 600;
`;

const HistoryDate = styled.div`
  color: var(--gray-70per);
  margin: 5px 0 10px 0;
  display: flex;
  align-items: center;

  img {
    width: 15px;
    height: 15px;
    margin-right: 4px;
  }
`;

const HistoryContent = styled.div`
  background-color: var(--gray-10per);
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  word-break: keep-all;
  line-height: 25px;
`;
