import { Children } from 'react';
import { useNavigate } from 'react-router-dom';

import { Layout } from '@components/Mobile';
import { projectList } from '@constants/project';
import styled from '@emotion/styled';

function Projects() {
  const navigate = useNavigate();

  const handleClickProject = (projectTitle: string) => {
    navigate(`/projects/${projectTitle}`, { replace: true });
  };

  return (
    <Layout title="프로젝트">
      <ProjectList>
        {Children.toArray(
          projectList.map((project) => (
            <Item onClick={() => handleClickProject(project.title)}>
              <Icon draggable={false} src={project.icon} alt={project.title} />
              <Title>{project.title}</Title>
            </Item>
          )),
        )}
      </ProjectList>
    </Layout>
  );
}

export default Projects;

const ProjectList = styled.ul`
  margin: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 35px;
`;

const Item = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Icon = styled.img`
  width: 100%;
  border-radius: 15px;
  margin-bottom: 15px;
`;

const Title = styled.div`
  font-size: 1.2em;
  font-weight: 500;
`;
