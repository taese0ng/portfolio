import { Children } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from '@emotion/styled';
import { DockItemType } from '@interfaces/dock';

const safariIcon = process.env.PUBLIC_URL + '/assets/images/icons/safari.webp';

interface Props {
  dockItems: Array<DockItemType>;
}

function Dock({ dockItems }: Props) {
  const navigate = useNavigate();

  const handleClickSafari = () => {
    window.open('https://www.google.co.kr');
  };

  const handleClickItem = (item: DockItemType) => {
    navigate(`/${item.id}`, { replace: true });
  };

  return (
    <Container>
      <Item onClick={handleClickSafari}>
        <img draggable="false" src={safariIcon} alt="safari" />
      </Item>

      {Children.toArray(
        dockItems.map((item) => (
          <Item
            onClick={() => {
              handleClickItem(item);
            }}
          >
            <img draggable="false" src={item.icon} alt={item.title} />
          </Item>
        )),
      )}
    </Container>
  );
}

export default Dock;

const Container = styled.div`
  position: absolute;
  bottom: 0;
  background-color: var(--white-70per);
  backdrop-filter: blur(20px);
  border: 1px solid var(--white-40per);
  padding: 13px 10px;
  border-radius: 20px;
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 10px;
`;

const Item = styled.div`
  border-radius: 10px;
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    height: 100%;
  }
`;
