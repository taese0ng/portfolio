import { Children, useState } from 'react';

import { Popup } from '@components/Desktop';
import { awardList } from '@constants/awards';
import styled from '@emotion/styled';
import { Award as AwardType } from '@interfaces/awards';

function Award() {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [selectedAward, setSelectedAward] = useState<AwardType>();

  const handleClickItem = (award: AwardType) => {
    setSelectedAward(award);
    setIsOpenPopup(true);
  };

  const handleClosePopup = () => {
    setIsOpenPopup(false);
  };

  return (
    <Container>
      <Wrapper>
        {Children.toArray(
          awardList.map((award) => (
            <Item onClick={() => handleClickItem(award)}>
              <ItemImg src={award.thumb} alt={award.title} />
              <ItemTitle>
                {award.title} ({award.class})
              </ItemTitle>
            </Item>
          )),
        )}
      </Wrapper>

      {isOpenPopup && selectedAward && (
        <Popup onClosePopup={handleClosePopup} hasCloseBtn>
          <ImageWrapper>
            <img src={selectedAward.src} alt={selectedAward.title} />
          </ImageWrapper>
        </Popup>
      )}
    </Container>
  );
}

export default Award;

const Container = styled.div`
  background-color: var(--gray-20);
  height: 100%;
`;

const Wrapper = styled.ul`
  height: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-flow: row wrap;
  overflow: auto;
`;

const Item = styled.li`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 15px;
`;

const ItemImg = styled.img`
  width: 180px;
  height: 260px;
  border-radius: 8px;

  &:hover {
    box-shadow: 0 0 0 3px var(--blue-20);
  }
`;

const ItemTitle = styled.div`
  font-size: 15px;
  font-weight: 600;
  margin-top: 10px;
`;

const ImageWrapper = styled.div`
  height: 80vh;
  max-height: 1300px;
  max-width: calc(100vw - 150px);
  border-radius: 15px;
  overflow: hidden;

  img {
    object-fit: fill;
    width: 100%;
    height: 100%;
  }
`;
