import { Children, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Layout } from '@components/Mobile';
import { Popup } from '@components/shared';
import { certificateList } from '@constants/certificates';
import styled from '@emotion/styled';
import { Certificate } from '@interfaces/certificates';

const path = '/certificates';
const param = 'id';

function Certificates() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const hasParams = Boolean(searchParams.get(param));
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  const handleClickCertificate = (certificate: Certificate) => {
    navigate(`${path}?${param}=${certificate.id}`, { replace: true });
  };

  const handleClosePopup = () => {
    navigate(path, { replace: true });
  };

  useEffect(() => {
    const findSelectedCertificate =
      certificateList.find((certificate) => certificate.id === searchParams.get(param)) ?? null;
    setSelectedCertificate(findSelectedCertificate);

    if (findSelectedCertificate && hasParams) {
      setIsOpenPopup(true);
    } else if (hasParams && !selectedCertificate) {
      setSelectedCertificate(null);
      setIsOpenPopup(false);
      handleClosePopup();
    }
  }, [hasParams]);

  return (
    <Layout title="자격증">
      <Wrapper>
        <CertificateList>
          {Children.toArray(
            certificateList.map((certificate) => (
              <Item>
                <img
                  onClick={() => handleClickCertificate(certificate)}
                  className="certificates__item--img"
                  src={certificate.src}
                  alt={certificate.title}
                />
                <Title>{certificate.title}</Title>
                <div>- {certificate.class} -</div>
              </Item>
            )),
          )}
        </CertificateList>

        {isOpenPopup && selectedCertificate && (
          <Popup onClosePopup={handleClosePopup}>
            <ImageWrapper>
              <img src={selectedCertificate.src} alt={selectedCertificate.title} />
            </ImageWrapper>
          </Popup>
        )}
      </Wrapper>
    </Layout>
  );
}

export default Certificates;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CertificateList = styled.ul`
  width: 80%;
  max-width: 350px;
  margin-top: 40px;
`;

const Item = styled.li`
  width: 100%;
  text-align: center;
  margin-bottom: 80px;
  img {
    width: 100%;
  }
`;

const Title = styled.div`
  margin-top: 15px;
  font-size: 1.3em;
  font-weight: 500;
`;

const ImageWrapper = styled.div`
  width: 95%;
  img {
    width: 100%;
  }
`;
