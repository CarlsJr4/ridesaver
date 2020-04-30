import React, { useState, useEffect, useContext } from 'react';
import PassengerTileContainer from '../passengerPanel/PassengerTileContainer';
import IconButton from '../reusable/IconButton';
import { CarpoolContext } from '../context/GlobalState';
import { Droppable } from 'react-beautiful-dnd';

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
				{(provided) => (
					<PassengerTileContainer
						{...provided.droppableProps}
						innerRef={provided.innerRef}
						passengers={passengers}
						handleUpdate={updateDriverList}
						driverId={id}
						placeholder={provided.placeholder}
					>
					</PassengerTileContainer>
				)}
			</Droppable>
		</div>
	);
}

export default DriverCard;
