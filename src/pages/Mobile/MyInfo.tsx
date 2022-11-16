import { Children } from 'react';

import { Layout } from '@components/Mobile';
import { contents, profileImg } from '@constants/info';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

function MyInfo() {
  const handleClickContent = (link?: string) => {
    if (link) window.open(link);
  };

  return (
    <Layout title="내 정보">
      <Wrapper>
        <ProfileImgWrapper>
          <img draggable={false} src={profileImg} alt="profileImg" />
        </ProfileImgWrapper>
        <ProfileName>김태성</ProfileName>

        <ul>
          {Children.toArray(
            contents.map((content) => (
              <ProfileContent onClick={() => handleClickContent(content.link)}>
                <ProfileContentsIcon src={content.icon} alt={content.id} />
                <ProfileContentsText link={Boolean(content.link)}>
                  {content.text}
                </ProfileContentsText>
              </ProfileContent>
            )),
          )}
        </ul>
      </Wrapper>
    </Layout>
  );
}

export default MyInfo;

const Wrapper = styled.div`
  background-color: transparent;
  padding: 20px 0;
`;

const ProfileImgWrapper = styled.div`
  margin: auto;
  width: 50vw;
  height: 50vw;
  max-width: 300px;
  max-height: 300px;
  border-radius: 100%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProfileName = styled.div`
  margin: 20px 0 40px 0;
  width: 100%;
  text-align: center;
  font-size: 1.8em;
  font-weight: 600;
`;

const ProfileContentsIcon = styled.img`
  width: 50px;
  height: 50px;
  margin: 0 10px 0 20px;
`;

const ProfileContentsText = styled.span<{ link: boolean }>`
  font-size: 1.3em;
  ${({ link }) =>
    link &&
    css`
      color: var(--blue-20);
    `}
`;

const ProfileContent = styled.li`
  display: flex;
  align-items: center;
  padding: 10px 0;
`;
