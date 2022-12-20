import { Children } from 'react';

import { Layout } from '@components/Mobile';
import { HistoryList } from '@components/Mobile/Histoies';
import { historyList } from '@constants/history';
import styled from '@emotion/styled';

const years = historyList
  .filter(
    (history, idx, originList) =>
      idx ===
      originList.findIndex((item) => item.from.getFullYear() === history.from.getFullYear()),
  )
  .map((history) => history.from.getFullYear());

function Histories() {
  return (
    <Layout title="히스토리">
      <HistoryLists>
        {Children.toArray(years.map((year) => <HistoryList year={year} />))}
      </HistoryLists>
    </Layout>
  );
}

export default Histories;

const HistoryLists = styled.div`
  height: 100%;
`;
