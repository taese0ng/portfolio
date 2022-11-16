import { Children } from 'react';

import { contents, profileImg } from '@constants/info';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

function Info() {
  const handleClickContent = (link?: string) => {
    if (link) window.open(link);
  };

  return (
    <Container>
      <ProfileImg>
        <img draggable={false} src={profileImg} alt="profileImg" />
      </ProfileImg>

      <ProfileContents>
        <ProfileContentsName>
          <div>김태성</div>
        </ProfileContentsName>

        {Children.toArray(
          contents.map((content) => (
            <ContentsLink
              isLink={Boolean(content.link)}
              onClick={() => handleClickContent(content?.link)}
            >
              <ContentsIcon draggable={false} src={content.icon} alt={content.id} />
              <span>{content.text}</span>
            </ContentsLink>
          )),
        )}
      </ProfileContents>
    </Container>
  );
}

export default Info;

const Container = styled.div`
  display: flex;
  background: var(--gray-20);
  align-items: center;
  height: 100%;
  padding: 0 50px;
`;

const ProfileImg = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 100%;
  flex-shrink: 0;
  border: 6px solid transparent;
  background-image: linear-gradient(to top, #a7a7a7, #fff);
  background-origin: border-box;
  background-clip: content-box, border-box;
  background-size: cover;
  box-sizing: border-box;
  box-shadow: 0 6px 15px -7px var(--black);

  img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
    object-fit: cover;
  }
`;

const ProfileContents = styled.ul`
  display: flex;
  flex-direction: column;
  font-size: 15px;
  width: 100%;
  margin: 0 0 0 60px;
  padding: 0;
  position: relative;
  top: -10px;
`;

const ProfileContent = styled.li`
  list-style: none;
  margin: 5px 0;
  font-weight: 700;
  display: flex;
  width: fit-content;
  align-items: center;
`;

const ProfileContentsName = styled(ProfileContent)`
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ContentsLink = styled(ProfileContent)<{ isLink: boolean }>`
  ${({ isLink }) =>
    isLink &&
    css`
      color: var(--blue-20);
      cursor: pointer;
    `}
`;

const ContentsIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 6px;
`;
