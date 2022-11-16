import { Children, useState } from 'react';

import { Layout } from '@components/Mobile';
import { Card } from '@components/shared';
import { historyList } from '@constants/history';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { History } from '@interfaces/history';

const clockIcon = process.env.PUBLIC_URL + '/assets/images/icons/clock.png';
const years = historyList
  .filter(
    (history, idx, originList) =>
      idx ===
      originList.findIndex((item) => item.from.getFullYear() === history.from.getFullYear()),
  )
  .map((history) => history.from.getFullYear());

function Histories() {
  const [openedList, setOpenedList] = useState<number[]>([]);

  const handleClickYear = (year: number) => {
    const hasValue = Boolean(openedList.find((list) => list === year));

    if (hasValue) {
      setOpenedList((prev) => prev.filter((list) => list !== year));
    } else {
      setOpenedList((prev) => [...prev, year]);
    }
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

  return (
    <Layout title="히스토리">
      <HistoryList>
        {Children.toArray(
          years.map((year) => (
            <ItemWrapper>
              <Year onClick={() => handleClickYear(year)}>
                <YearIcon clicked={Boolean(openedList.find((list) => list === year))}></YearIcon>
                <span>{year} 년</span>
              </Year>
              <HistoryItemList opened={Boolean(openedList.find((list) => list === year))}>
                {Children.toArray(
                  getHistoryContents(year).map((history) => (
                    <li>
                      <Card>
                        <ItemTitle>{history.title}</ItemTitle>
                        <ItemDate>
                          <img src={clockIcon} alt="clock" />
                          {getDate(history)}
                        </ItemDate>
                        <ItemContent>{history.content}</ItemContent>
                      </Card>
                    </li>
                  )),
                )}
              </HistoryItemList>
            </ItemWrapper>
          )),
        )}
      </HistoryList>
    </Layout>
  );
}

export default Histories;

const HistoryList = styled.ul`
  height: 100%;
`;

const ItemWrapper = styled.li`
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

const HistoryItemList = styled.ul<{ opened: boolean }>`
  transform: scaleY(1);
  overflow: hidden;
  max-height: 0;
  transition: max-height 1s cubic-bezier(0.1, 1, 0.1, 1);
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 10px;

  ${({ opened }) =>
    opened &&
    css`
      max-height: 100vh;
      transition: max-height 1s ease;
    `}
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
