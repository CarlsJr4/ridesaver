import React, { useState, useEffect, useContext } from 'react';
import PassengerTileContainer from '../PassengerContainer';
import IconButton from '../../../reusable_components/IconButton';
import { CarpoolContext } from '../../../context/GlobalState';
import { Droppable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';

const DriverCard = ({name, id, passengers, totalSeats, toggleEditDriver, updateDriverBeingEdited}) => {
	const [seatCapacityBar, updateCapacityBar] = useState(0); // Capacity bar width
	const {updateDriverList} = useContext(CarpoolContext);
	useEffect(() => updateCapacityBar((passengers.length / totalSeats) * 100), [passengers.length, totalSeats]);

	function callEditModal() {
		toggleEditDriver(true);
		updateDriverBeingEdited({
			name,
			totalSeats,
			passengers,
			id
		})
	}

	return (
		<div className="driversCard">
			<div className="driversCard__headerTop">
				<p>{name}</p>
				<IconButton
					icon="user-edit"
					handleClick={callEditModal}
				/>
			</div>
			<div className="driversCard__headerBottom">
				<p>({passengers.length}/{totalSeats})</p>
				<div 
					className={`${seatCapacityBar} ` < 100 ? 'driversCard__percentBar--incomplete' : 'driversCard__percentBar--complete' }
					style={{
						width: `${seatCapacityBar}%`,
					}}>
				</div>
			</div>
			<Droppable
				droppableId={id.toString()}
			>
				{(provided, snapshot) => (
					<PassengerTileContainer
						{...provided.droppableProps}
						innerRef={provided.innerRef}
						passengers={passengers}
						handleUpdate={updateDriverList}
						driverId={id}
						placeholder={provided.placeholder}
						isDraggingOver={snapshot.isDraggingOver}
					>
					</PassengerTileContainer>
				)}
			</Droppable>
		</div>
	);
}
// name, nickname, id, passengers, totalSeats, toggleEditDriver, updateDriverBeingEdited
DriverCard.propTypes = {
	name: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	passengers: PropTypes.array.isRequired,
	totalSeats: PropTypes.number.isRequired,
	toggleEditDriver: PropTypes.func.isRequired,
	updateDriverBeingEdited: PropTypes.func.isRequired
}

export default DriverCard;
