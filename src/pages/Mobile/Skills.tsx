import { Children } from 'react';

import { Layout } from '@components/Mobile';
import { skillList } from '@constants/skill';
import styled from '@emotion/styled';

function Skills() {
  return (
    <Layout title="기술스택">
      <SkillList>
        {Children.toArray(
          skillList.map(({ src, title }) => (
            <Item>
              <ItemImg src={src} alt={title} />
            </Item>
          )),
        )}
      </SkillList>
    </Layout>
  );
}

export default Skills;

const SkillList = styled.ul`
  margin: 30px 40px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 90px;
`;

const Item = styled.li`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ItemImg = styled.img`
  width: 100%;
`;
