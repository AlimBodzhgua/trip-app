import { FC, memo } from 'react';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import { selectCards } from 'redux/selectors/selectors';
import { userActions } from 'redux/slices/userSlice';
import { SortableList } from 'lib/components';
import { CardItem } from '../CardItem/CardItem';
import classes from './cards.module.css';

interface CardsListProps {
	travelId: string;
	groupId: string;
}

export const CardsList:FC<CardsListProps> = memo((props) => {
	const { travelId, groupId } = props;
	const cards = useAppSelector(state => selectCards(state, travelId, groupId));
	const dispatch = useAppDispatch();

	const handleDragEnd = (e: {active: any, over: any}):void => {
		const {active, over} = e;
		if (active.id === over.id) {
			return;
		}
		dispatch(userActions.moveCards({
			travelId: travelId,
			groupId: groupId,
			activeId: active.id,
			overId: over.id
		}));
	};

	return (
		<SortableList
			onDragEnd={handleDragEnd}
			items={cards}
		>
			<ul className={classes.list}>
					{cards.map(card => 
						<CardItem 
							key={card.id}
							card={card}
							groupId={groupId}
							travelId={travelId}
						/>
					)}
			</ul>
		</SortableList>
	);
});
