import { Children, useEffect, useState } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

const dayList = ['일', '월', '화', '수', '목', '금', '토'];
let mainDate = new Date();

function Calendar() {
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [todate, setToday] = useState(0);
  const [toMonth, setToMonth] = useState(0);
  const [toYear, setToYear] = useState(0);
  const [dateList, setDateList] = useState<Array<Array<number>>>([]);
  const [selectedDate, setSelectedDate] = useState(0);

  const makeDayList = (startDate: number, lastDate: number) => {
    const tempArr: Array<Array<number>> = [];

    for (let i = startDate; i < lastDate; i = i + 7) {
      const tempRow: Array<number> = [];
      for (let j = 0; j < 7; j++) {
        const date = i + j;
        if (date <= lastDate) {
          tempRow.push(date);
        }
      }
      tempArr.push(tempRow);
    }

    return tempArr;
  };

  const init = () => {
    const tempMonth = mainDate.getMonth() + 1;
    setYear(mainDate.getFullYear());
    setMonth(tempMonth);

    mainDate.setDate(1);
    const startDay = mainDate.getDay();
    const startDate = mainDate.getDate() - startDay;

    mainDate.setMonth(tempMonth);
    mainDate.setDate(0);
    const lastDate = mainDate.getDate();

    setDateList(makeDayList(startDate, lastDate));
  };

  const handleClickDate = (date: number) => {
    setSelectedDate(date);
  };

  const handlePrevCalendar = () => {
    const nowMonth = mainDate.getMonth();
    mainDate.setDate(1);
    mainDate.setMonth(nowMonth - 1);
    init();
  };

  const handleNowCalendar = () => {
    mainDate = new Date();
    init();
  };

  const handleNextCalendar = () => {
    const nowMonth = mainDate.getMonth();
    mainDate.setDate(1);
    mainDate.setMonth(nowMonth + 1);

    init();
  };

  const getTodayValue = (date: Date) => {
    setToMonth(date.getMonth() + 1);
    setToYear(date.getFullYear());
    setToday(date.getDate());
  };

  useEffect(() => {
    init();

    const date = new Date();
    getTodayValue(date);

    const interval = setInterval(() => {
      getTodayValue(date);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <Header>
        <Title>
          {month}월 {year}
        </Title>

        <ControlWrapper>
          <ControlBtn onClick={handlePrevCalendar}>◁</ControlBtn>
          <ControlBtn onClick={handleNowCalendar}>○</ControlBtn>
          <ControlBtn onClick={handleNextCalendar}>▷</ControlBtn>
        </ControlWrapper>
      </Header>
      <Body>
        <Row>{Children.toArray(dayList.map((day) => <Item>{day}</Item>))}</Row>

        <DateWrapper>
          {Children.toArray(
            dateList.map((dateRow) => (
              <Row>
                {Children.toArray(
                  dateRow.map((date) => (
                    <DateItem
                      uppedCursor={date > 0}
                      today={todate === date && toMonth === month && toYear === year}
                      selected={selectedDate === date && date > 0}
                      onClick={() => handleClickDate(date)}
                    >
                      {date > 0 ? date : ''}
                    </DateItem>
                  )),
                )}
              </Row>
            )),
          )}
        </DateWrapper>
      </Body>
    </Container>
  );
}

export default Calendar;

const Container = styled.div``;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
`;

const Title = styled.div`
  margin: 3px;
`;

const ControlWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ControlBtn = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border-radius: 5px;
  font-size: 12px;

  &:hover {
    background-color: var(--white-20per);
  }
`;

const Row = styled.div`
  display: flex;
`;

const Body = styled.div`
  margin: 10px 0;
`;

const DateWrapper = styled.div``;

const Item = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 3px;
  font-size: 13px;
  width: 22px;
  height: 22px;
`;

const DateItem = styled(Item)<{ uppedCursor: boolean; today: boolean; selected: boolean }>`
  ${({ uppedCursor }) =>
    uppedCursor &&
    css`
      cursor: pointer;
    `}

  ${({ today }) =>
    today &&
    css`
      border-radius: 5px;
      box-shadow: 0 0 0 1.5px var(--blue-20);
    `}

    ${({ selected }) =>
    selected &&
    css`
      border-radius: 5px;
      box-shadow: 0 0 0 1.5px var(--white-70per);
    `} 

    &:hover {
    border-radius: 5px;
    box-shadow: 0 0 0 1.5px var(--white-70per);
  }
`;
