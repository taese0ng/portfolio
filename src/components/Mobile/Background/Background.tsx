import { Children } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from '@emotion/styled';
import { DockItemType } from '@interfaces/dock';

interface Props {
  items: Array<DockItemType>;
}

function Background({ items }: Props) {
  const navigate = useNavigate();

  const handleClickItem = (item: DockItemType) => {
    navigate(`/${item.id}`);
  };

  return (
    <Container>
      {Children.toArray(
        items.map((item) => (
          <ItemContainer>
            <Item
              onClick={() => {
                handleClickItem(item);
              }}
            >
              <img draggable="false" src={item.icon} alt={item.title} />
            </Item>
            <ItemTitle>{item.title}</ItemTitle>
          </ItemContainer>
        )),
      )}
    </Container>
  );
}

export default Background;

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 20px 0;
  grid-row-gap: 25px;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ItemTitle = styled.span`
  font-size: 15px;
  font-weight: 500;
  color: var(--white);
  margin-top: 10px;
`;

const Item = styled.div`
  background-color: var(--gray-60);
  border-radius: 20px;
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
