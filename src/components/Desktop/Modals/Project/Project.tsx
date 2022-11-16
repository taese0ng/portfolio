import { Children, useEffect, useRef, useState } from 'react';

import { Card } from '@components/shared';
import { projectList } from '@constants/project';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Project as ProjectType } from '@interfaces/project';

const clockIcon = process.env.PUBLIC_URL + 'assets/images/icons/clock.png';
const githubIcon = process.env.PUBLIC_URL + 'assets/images/icons/githubBtn.png';

function Project() {
  const localStorageWidth = localStorage.getItem('project_sidebar_width');
  const projectSideBarWidth = localStorageWidth ? JSON.parse(localStorageWidth) : 200;
  const containerRef = useRef<HTMLDivElement>(null);
  const cardListRef = useRef<HTMLUListElement>(null);
  const bodyWrapperRef = useRef<HTMLDivElement>(null);
  const [isClicked, setIsClicked] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectType>(projectList[0]);
  const [sideBarWidth, setSideBarWidth] = useState(projectSideBarWidth);

  const handleMouseDown = () => {
    setIsClicked(true);
  };

  const handleMouseUp = () => {
    setIsClicked(false);
    localStorage.setItem('project_sidebar_width', JSON.stringify(sideBarWidth));
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isClicked && containerRef.current && bodyWrapperRef.current) {
      const containerLeft = containerRef.current.getBoundingClientRect().left;
      const tempSideBarWidth = e.pageX - containerLeft;

      if (tempSideBarWidth <= 100) {
        setSideBarWidth(100);
      } else if (tempSideBarWidth < bodyWrapperRef.current.clientWidth / 2) {
        setSideBarWidth(tempSideBarWidth);
      }
    }
  };

  const handleClickTitle = (project: ProjectType) => {
    cardListRef.current?.scroll({ top: 0, behavior: 'smooth' });
    setSelectedProject(project);
  };

  const handleClickUrl = (url?: string) => {
    if (url) {
      window.open(url, '_target');
    }
  };

  const getDate = (project: ProjectType) => {
    const startAt = project.startAt;
    const endAt = project.endAt;
    const startYear = startAt.getFullYear();
    const startMonth = startAt.getMonth() + 1;
    const endYear = endAt.getFullYear();
    const endMonth = endAt.getMonth() + 1;
    const startDate = `${startYear}.${startMonth > 10 ? startMonth : `0${startMonth}`}`;
    const endDate = `${endYear}.${endMonth > 10 ? endMonth : `0${endMonth}`}`;

    return `${startDate} - ${endDate}`;
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isClicked]);

  return (
    <Container ref={containerRef}>
      <SideBarWrapper>
        <SideBar width={sideBarWidth}>
          <SideBarCategory>프로젝트</SideBarCategory>

          <SideBarList>
            {Children.toArray(
              projectList.map((project) => (
                <SideBarItem
                  onClick={() => handleClickTitle(project)}
                  isFocused={selectedProject.id === project.id}
                >
                  {project.title}
                </SideBarItem>
              )),
            )}
          </SideBarList>
        </SideBar>

        <WidthSetter onMouseDown={handleMouseDown}></WidthSetter>
      </SideBarWrapper>

      <BodyWrapper ref={bodyWrapperRef}>
        <Header>프로젝트</Header>
        <Body>
          <CardList ref={cardListRef}>
            <li>
              <Card>
                <CardWrapper isRow>
                  <CardWrapperIcon draggable={false} src={selectedProject.icon} alt="projectIcon" />
                  <div>
                    <CardWrapperTitle>
                      {selectedProject.title}
                      <CardWrapperSubTitle>{selectedProject.subTitle}</CardWrapperSubTitle>
                    </CardWrapperTitle>

                    <CardWrapperDate>
                      <img draggable={false} src={clockIcon} alt="clock" />
                      {getDate(selectedProject)}
                    </CardWrapperDate>
                  </div>

                  <CardWrapperLinks>
                    {selectedProject.githubUrl && (
                      <CardWrapperLink onClick={() => handleClickUrl(selectedProject.githubUrl)}>
                        <img draggable={false} src={githubIcon} alt="githubBtn" />
                      </CardWrapperLink>
                    )}
                    {selectedProject.url && (
                      <CardWrapperLink onClick={() => handleClickUrl(selectedProject.url)}>
                        구경하기
                      </CardWrapperLink>
                    )}
                  </CardWrapperLinks>
                </CardWrapper>
              </Card>
            </li>

            <li>
              <Card>
                <CardWrapper>
                  <CardWrapperTitle>Project Positions</CardWrapperTitle>
                  <CardWrapperTags>
                    {Children.toArray(
                      selectedProject.positions.map((position) => <Tag>{position}</Tag>),
                    )}
                  </CardWrapperTags>
                </CardWrapper>
              </Card>
            </li>

            <li>
              <Card>
                <CardWrapper>
                  <CardWrapperTitle>Skills</CardWrapperTitle>
                  <CardWrapperTags>
                    {Children.toArray(selectedProject.skills.map((skill) => <Tag>{skill}</Tag>))}
                  </CardWrapperTags>
                </CardWrapper>
              </Card>
            </li>

            <li>
              <Card>
                <CardWrapper>
                  <CardWrapperTitle>Explanation</CardWrapperTitle>
                  <CardWrapperContents>
                    {Children.toArray(
                      selectedProject.explanations.map((explanation) => <li>- {explanation}</li>),
                    )}
                  </CardWrapperContents>
                </CardWrapper>
              </Card>
            </li>

            <li>
              <Card>
                <CardWrapper>
                  <CardWrapperTitle>Images</CardWrapperTitle>
                  <CardWrapperImages>
                    {Children.toArray(
                      selectedProject.imgs.map((img) => (
                        <li>
                          <img draggable={false} src={img} alt={img} />
                        </li>
                      )),
                    )}
                  </CardWrapperImages>
                </CardWrapper>
              </Card>
            </li>
          </CardList>
        </Body>
      </BodyWrapper>
    </Container>
  );
}

export default Project;

const Container = styled.div`
  display: flex;
  height: calc(100% + 30px);
`;

const SideBarWrapper = styled.div`
  position: relative;
  backdrop-filter: blur(15px);
  background-color: var(--white-70per);
  padding-top: 30px;
`;

const SideBar = styled.div<{ width: number }>`
  width: ${({ width }) => width}px;
  padding: 0 10px;
`;

const SideBarCategory = styled.div`
  padding: 5px;
  font-size: 15px;
  font-weight: bold;
  color: var(--gray-90);
  margin: 5px 0;
`;

const SideBarList = styled.ul``;

const SideBarItem = styled.li<{ isFocused: boolean }>`
  cursor: pointer;
  padding: 5px;
  border-radius: 8px;
  margin: 2px 0;
  ${({ isFocused }) =>
    isFocused &&
    css`
      background-color: var(--gray-20per);
      font-weight: 600;
    `}

  :hover {
    background-color: var(--gray-20per);
  }
`;

const WidthSetter = styled.span`
  position: absolute;
  right: -5px;
  top: 0;
  height: 100%;
  width: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: e-resize;
`;

const BodyWrapper = styled.div`
  width: 100%;
`;

const Header = styled.div`
  width: 100%;
  height: 30px;
  background-color: var(--gray-30);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Body = styled.div`
  height: calc(100% - 30px);
  background-color: var(--gray-20);
`;

const CardList = styled.ul`
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  padding: 15px;
  gap: 15px;
`;

const CardWrapper = styled.div<{ isRow?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-items: center;

  ${({ isRow }) =>
    isRow &&
    css`
      flex-direction: row !important;
    `}
`;

const CardWrapperIcon = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 20px;
  margin-right: 15px;
`;

const CardWrapperTitle = styled.div`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const CardWrapperSubTitle = styled.div`
  font-size: 15px;
  font-weight: 400;
`;

const CardWrapperDate = styled.div`
  color: var(--gray-70per);
  margin: 5px 0 10px 0;
  display: flex;
  align-items: center;

  img {
    width: 15px;
    height: 15px;
    margin-right: 4px;
  }
`;

const CardWrapperLinks = styled.ul`
  position: absolute;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const CardWrapperLink = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 30px;
  border-radius: 10px;
  border: 2px solid var(--black);
  overflow: hidden;
  cursor: pointer;
  img {
    width: 100%;
  }
`;

const CardWrapperTags = styled.ul`
  width: fit-content;
  display: flex;
  gap: 10px;
  white-space: nowrap;
  flex-wrap: wrap;
`;

const Tag = styled.li`
  font-weight: bold;
  background-color: var(--gray-10per);
  border-radius: 5px;
  padding: 5px;
  width: fit-content;
`;

const CardWrapperContents = styled.ul`
  background-color: var(--gray-10per);
  padding: 10px;
  border-radius: 5px;
  font-size: 17px;
  word-break: keep-all;
  line-height: 25px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const CardWrapperImages = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  li {
    width: 100%;
    img {
      width: 100%;
    }
  }
`;
