import { useEffect, useState } from 'react';

import styled from '@emotion/styled';

function Time() {
  const [midday, setMidday] = useState('');
  const [hour, setHour] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState(0);
  const [date, setDate] = useState(0);

  const setTime = () => {
    const dayList = ['일', '월', '화', '수', '목', '금', '토'],
      dateObj = new Date(),
      tempHour = dateObj.getHours() % 12 || 12,
      tempMin = dateObj.getMinutes(),
      tempSec = dateObj.getSeconds();

    setMonth(dateObj.getMonth() + 1);
    setDate(dateObj.getDate());
    setDay(dayList[dateObj.getDay()]);
    setMidday(dateObj.getHours() < 12 ? '오전' : '오후');
    setHour(tempHour > 9 ? String(tempHour) : `0${tempHour}`);
    setMin(tempMin > 9 ? String(tempMin) : `0${tempMin}`);
    setSec(tempSec > 9 ? String(tempSec) : `0${tempSec}`);
  };

  useEffect(() => {
    setTime();
    const interval = setInterval(setTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      ٩(◕‿◕｡)۶ {month}월 {date}일 ({day}) {midday}
      {hour}:{min}:{sec}
    </Container>
  );
}

export default Time;

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 0 5px;
  height: 100%;
  font-size: 0.9rem;
  white-space: nowrap;
`;
