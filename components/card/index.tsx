import { FC } from 'react';
import { ICardProps } from './card.types';

const Card: FC<ICardProps> = ({ cardName, currNumber }) => {
  const someObj = {
    a: 1,
    b: 3,
    c: 4,
  };
  interface b {
    some: 'sd';
  }

  return (
    <>
      <div style={{ height: '40px', width: '40px', backgroundColor: 'red' }}>
        {cardName}
        {currNumber}
      </div>
    </>
  );
};
export default Card;
