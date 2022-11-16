import { Children, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Layout } from '@components/Mobile';
import { Card } from '@components/shared';
import { projectList } from '@constants/project';
import styled from '@emotion/styled';
import { Project } from '@interfaces/project';

const clockIcon = process.env.PUBLIC_URL + '/assets/images/icons/clock.png';
const githubIcon = process.env.PUBLIC_URL + '/assets/images/icons/githubBtn.png';

function ProjectDetail() {
  const navigate = useNavigate();
  const { id: projectId = '' } = useParams();
  const [hasLink, setHasLink] = useState(false);
  const [project, setProject] = useState<Project | null>(null);

  const getDate = () => {
    if (project) {
      const startAt = project.startAt;
      const endAt = project.endAt;
      const startYear = startAt.getFullYear();
      const startMonth = startAt.getMonth() + 1;
      const endYear = endAt.getFullYear();
      const endMonth = endAt.getMonth() + 1;
      const startDate = `${startYear}.${startMonth > 10 ? startMonth : `0${startMonth}`}`;
      const endDate = `${endYear}.${endMonth > 10 ? endMonth : `0${endMonth}`}`;

      return `${startDate} - ${endDate}`;
    }
  };

  const handleClickUrl = (url?: string) => {
    if (url) window.open(url, '_target');
  };

  useEffect(() => {
    const findProject = projectList.find((project: Project) => project.id === projectId) ?? null;
    setProject(findProject);

    if (!findProject) {
      navigate('/projects', { replace: true });
    } else {
      setHasLink(Boolean(project?.url || project?.githubUrl));
    }
  }, []);

  return (
    <Layout title={projectId}>
      <Wrapper>
        <Card>
          <MainInfo>
            <MainInfoIcon draggable={false} src={project?.icon} alt={project?.title} />
            <div>
              <MainInfoTitle>{project?.title}</MainInfoTitle>
              <div>{project?.subTitle}</div>
              <MainInfoContentsDate>
                <img draggable={false} src={clockIcon} alt="clock" />
                <span>{getDate()}</span>
              </MainInfoContentsDate>
            </div>
          </MainInfo>
        </Card>

        {hasLink && (
          <Card>
            <div className="link">
              <Title>Links</Title>
              <LinkContents>
                {project?.githubUrl && (
                  <LinkItemGit onClick={() => handleClickUrl(project.githubUrl)}>
                    <img draggable={false} src={githubIcon} alt="github" />
                  </LinkItemGit>
                )}
                {project?.url && (
                  <LinkItemUrl onClick={() => handleClickUrl(project.url)}>구경하기</LinkItemUrl>
                )}
              </LinkContents>
            </div>
          </Card>
        )}

        <Card>
          <div className="position">
            <Title>Project Positions</Title>
            <Tags>
              {Children.toArray(project?.positions.map((position) => <Tag>{position}</Tag>))}
            </Tags>
          </div>
        </Card>

        <Card>
          <div className="skill">
            <Title>Skills</Title>
            <Tags>{Children.toArray(project?.skills.map((skill) => <Tag>{skill}</Tag>))}</Tags>
          </div>
        </Card>

        <Card>
          <div className="explanation">
            <Title>Explanation</Title>
            <ExplanationContents>
              {Children.toArray(
                project?.explanations.map((explanation) => (
                  <ExplanationItem>{explanation}</ExplanationItem>
                )),
              )}
            </ExplanationContents>
          </div>
        </Card>

        <Card>
          <div className="images">
            <Title>Images</Title>
            <ImagesContents>
              {Children.toArray(
                project?.imgs.map((img) => (
                  <ImagesItem>
                    <img draggable={false} src={img} alt="" />
                  </ImagesItem>
                )),
              )}
            </ImagesContents>
          </div>
        </Card>
      </Wrapper>
    </Layout>
  );
}

export default ProjectDetail;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 20px;
  font-size: 0.9em;
`;

const Title = styled.div`
  font-size: 1.1em;
  font-weight: 600;
  margin-bottom: 10px;
`;

const MainInfoTitle = styled(Title)`
  margin-bottom: 0;
`;

const MainInfo = styled.div`
  display: flex;
  gap: 10px;
`;

const MainInfoIcon = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 15px;
`;

const MainInfoContentsDate = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  color: var(--gray-70per);
  gap: 5px;
  img {
    width: 15px;
    height: 15px;
  }
`;

const LinkContents = styled.ul`
  width: fit-content;
  display: flex;
  gap: 10px;
  white-space: nowrap;
  flex-wrap: wrap;
`;

const LinkItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 2px solid var(--black);
`;

const LinkItemGit = styled(LinkItem)`
  img {
    width: 80px;
  }
`;

const LinkItemUrl = styled(LinkItem)`
  padding: 0 15px;
  font-weight: 700;
`;

const ExplanationContents = styled.ul`
  position: relative;
  background-color: var(--gray-10per);
  padding: 10px 20px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ExplanationItem = styled.li`
  list-style: unset;
`;

const ImagesContents = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ImagesItem = styled.li`
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
  img {
    width: 100%;
  }
`;

const Tags = styled.ul`
  width: fit-content;
  display: flex;
  gap: 10px;
  white-space: nowrap;
  flex-wrap: wrap;
`;

const Tag = styled.li`
  font-weight: 500;
  background-color: var(--gray-10per);
  border-radius: 5px;
  padding: 5px;
  width: fit-content;
`;
