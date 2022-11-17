import { useEffect, useState } from 'react';
import { NotionRenderer } from 'react-notion';

import { Layout } from '@components/Mobile';
import styled from '@emotion/styled';
import Axios from '~/apis';

function Notion() {
  const [blockMap, setBlockMap] = useState<any>({});
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const pageId = '0b01f2b4e3884508b588b09ec2ed3554';
    Axios.get(`https://notion-api.splitbee.io/v1/page/${pageId}`)
      .then(({ data }) => {
        setBlockMap(data);
      })
      .catch(() => setIsError(true))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <Layout title="notion">
        <Loading>Loading...</Loading>
      </Layout>
    );
  }

  return (
    <Layout title="notion">
      {isError ? (
        <Error>
          <Korean>AdBlocker와 같은 프로그램을 꺼주세요</Korean>
          <English>Turn off programs like AdBlocker</English>
        </Error>
      ) : (
        Object.keys(blockMap).length && <NotionRenderer blockMap={blockMap} fullPage />
      )}
    </Layout>
  );
}

export default Notion;

const Loading = styled.div`
  font-size: 1.3em;
  padding: 20px;
`;

const Error = styled.div`
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

const Korean = styled.span`
  font-size: 1.3em;
  font-weight: bold;
`;

const English = styled.span`
  font-size: 1em;
  font-weight: 600;
`;
