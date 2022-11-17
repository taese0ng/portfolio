import { useEffect, useState } from 'react';
import { NotionRenderer } from 'react-notion';

import styled from '@emotion/styled';
import Axios from '~/apis';

import 'react-notion/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';

function Notion() {
  const [blockMap, setBlockMap] = useState<any>({});
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const pageId = '0b01f2b4e3884508b588b09ec2ed3554';
    Axios.get(`https://notion-api.splitbee.io/v1/page/${pageId}`)
      .then(({ data }) => setBlockMap(data))
      .catch(() => setIsError(true));
  }, []);

  return (
    <Container>
      {isError ? (
        <Error>
          <Korean>AdBlocker와 같은 프로그램을 꺼주세요</Korean>
          <English>Turn off programs like AdBlocker</English>
        </Error>
      ) : (
        Object.keys(blockMap).length && <NotionRenderer blockMap={blockMap} fullPage />
      )}
    </Container>
  );
}

export default Notion;

const Container = styled.div`
  height: 100%;
  overflow: auto;
  background: var(--white);
`;

const Error = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

const Korean = styled.span`
  font-size: 2em;
  font-weight: bold;
`;

const English = styled.span`
  font-size: 1.5em;
  font-weight: 600;
`;
