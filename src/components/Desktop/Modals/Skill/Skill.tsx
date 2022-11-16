import { Children } from 'react';

import { skillList } from '@constants/skill';
import styled from '@emotion/styled';

function Skill() {
  return (
    <Container>
      <Skills>
        {Children.toArray(
          skillList.map((skill) => (
            <Item>
              <ItemImg draggable={false} src={skill.src} alt={skill.title} />
              <ItemTitle>{skill.title}</ItemTitle>
            </Item>
          )),
        )}
      </Skills>
    </Container>
  );
}

export default Skill;

const Container = styled.div`
  background-color: var(--gray-20);
  height: 100%;
`;

const Skills = styled.ul`
  height: 100%;
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  overflow: auto;
`;

const Item = styled.li`
  width: 150px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 30px;
`;

const ItemImg = styled.img`
  border-radius: 10px;
  max-height: 100px;
  width: auto;
`;

const ItemTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-top: 15px;
`;
