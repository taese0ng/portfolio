import { Children, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Layout } from '@components/Mobile';
import { Popup } from '@components/shared';
import { awardList } from '@constants/awards';
import styled from '@emotion/styled';
import { Award } from '@interfaces/awards';

const param = 'id';
const path = '/awards';

function Awards() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const hasParams = Boolean(searchParams.get(param));
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [selectedAward, setSelectedAward] = useState<Award | null>(null);

  const handleClickAward = (award: Award) => {
    navigate(`${path}?${param}=${award.id}`, { replace: true });
  };

  const handleClosePopup = () => {
    navigate(path, { replace: true });
  };

  useEffect(() => {
    const findAward = awardList.find((award) => award.id === searchParams.get(param)) ?? null;
    setSelectedAward(findAward);

    if (findAward && hasParams) {
      setIsOpenPopup(true);
    } else if (hasParams && !selectedAward) {
      setSelectedAward(null);
      setIsOpenPopup(false);
      handleClosePopup();
    }
  }, [hasParams]);

  return (
    <Layout title="수상경력">
      <Wrapper>
        <AwardList>
          {Children.toArray(
            awardList.map((award) => (
              <Item>
                <Image
                  onClick={() => handleClickAward(award)}
                  className="awards__item--img"
                  src={award.src}
                  alt={award.title}
                />
                <Title>{award.title}</Title>
                <div>- {award.class} -</div>
              </Item>
            )),
          )}
        </AwardList>

        {isOpenPopup && selectedAward && (
          <Popup onClosePopup={handleClosePopup}>
            <ImageWrapper>
              <Image src={selectedAward.src} alt={selectedAward.title} />
            </ImageWrapper>
          </Popup>
        )}
      </Wrapper>
    </Layout>
  );
}

export default Awards;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AwardList = styled.ul`
  width: 80%;
  max-width: 350px;
  margin-top: 40px;
`;

const Item = styled.li`
  width: 100%;
  text-align: center;
  margin-bottom: 80px;
`;

const Title = styled.div`
  margin-top: 15px;
  font-size: 1.3em;
  font-weight: 500;
`;

const ImageWrapper = styled.div`
  width: 95%;
`;

const Image = styled.img`
  width: 100%;
`;
