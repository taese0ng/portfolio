import { Children, useEffect, useRef, useState } from 'react';

import { Card } from '@components/shared';
import { historyList } from '@constants/history';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { History } from '@interfaces/history';

const clockIcon = process.env.PUBLIC_URL + '/assets/images/icons/clock.webp';

interface Props {
  year: number;
}

function HistoryList({ year }: Props) {
  const historyItemRef = useRef<HTMLUListElement>(null);
  const [isOpened, setIsOpened] = useState(false);
  const [listHeight, setLishHeight] = useState(0);

  const handleClickYear = () => {
    setIsOpened((prev) => !prev);
  };

  const getHistoryContents = (year: number) => {
    const histories = historyList.filter((history) => history.from.getFullYear() === year);

    return histories;
  };

  const getDate = (history: History) => {
    const year = history.from.getFullYear();
    const month = history.from.getMonth() + 1;
    return `${year}-${month < 10 ? `0${month}` : month}`;
  };

  useEffect(() => {
    if (historyItemRef.current) {
      if (isOpened) {
        setLishHeight(historyItemRef.current.scrollHeight);
      } else {
        setLishHeight(0);
      }
    }
  }, [isOpened]);

  return (
    <Container>
      <Year onClick={handleClickYear}>
        <YearIcon clicked={isOpened} />
        <span>{year} 년</span>
      </Year>

      <HistoryItemList ref={historyItemRef} opened={isOpened} height={listHeight}>
        {Children.toArray(
          getHistoryContents(year).map((history) => (
            <Item opened={isOpened}>
              <Card>
                <ItemTitle>{history.title}</ItemTitle>
                <ItemDate>
                  <img src={clockIcon} alt="clock" />
                  {getDate(history)}
                </ItemDate>
                <ItemContent>{history.content}</ItemContent>
              </Card>
            </Item>
          )),
        )}
      </HistoryItemList>
    </Container>
  );
}

export default HistoryList;

const Container = styled.div`
  margin: 10px;
`;

const Year = styled.div`
  font-size: 1.4em;
  display: flex;
  align-items: center;
`;

const YearIcon = styled.div<{ clicked: boolean }>`
  width: 15px;
  height: 15px;
  border: 1px solid var(--gray-50per);
  border-radius: 100%;
  margin-right: 10px;

  ${({ clicked }) =>
    clicked &&
    css`
      background-color: var(--gray-70per);
    `}
`;

const HistoryItemList = styled.ul<{ opened: boolean; height: number }>`
  overflow: hidden !important;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 10px;
  z-index: 1000;
  transition: all 0.3s;
  height: ${({ height }) => height}px;
  visibility: ${({ opened }) => (opened ? 'visible' : 'hidden')};
`;

const Item = styled.li<{ opened: boolean }>`
  transition: all 0.3s;
  visibility: ${({ opened }) => (opened ? 'visible' : 'hidden')};
  opacity: ${({ opened }) => (opened ? 1 : 0)};
`;

const ItemTitle = styled.div`
  font-size: 1.3em;
  font-weight: 500;
  margin-bottom: 5px;
`;

const ItemDate = styled.div`
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  img {
    width: 15px;
    height: 15px;
    margin-right: 4px;
  }
`;

const ItemContent = styled.div`
  font-size: 1.1em;
`;
