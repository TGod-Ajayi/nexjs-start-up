import { FC } from 'react';
import { ICardProps } from './card.types';

const Card: FC<ICardProps> = ({ cardName, currNumber }) => {
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
