import React, { useState, useEffect, useContext } from 'react';
import PassengerTileContainer from '../passengerPanel/PassengerTileContainer';
import IconButton from '../../reusable/IconButton';
import { CarpoolContext } from '../../context/GlobalState';

// We destructure all these props because we need to assign them to each key
const DriverCard = ({name, passengers, totalSeats, driverIndex, toggleEditDriver, updateDriverBeingEdited}) => {
	const [seatCapacityBar, updateCapacityBar] = useState(0); // Capacity bar width
	const {updateDriverList} = useContext(CarpoolContext);
	useEffect(() => updateCapacityBar((passengers.length / totalSeats) * 100), [passengers.length, totalSeats]);

	// When we click the icon button, an external state is set 
	// We can probably send this data to the parent component's state and render it in the modal
	function callEditModal() {
		toggleEditDriver(true);
		updateDriverBeingEdited({
			name,
			totalSeats,
			driverIndex
		})
	}

	return (
		<div className="driversCard">
			<div className="driversCard__header">
				<p>{name}</p>
				<IconButton
					icon="user-edit"
					handleClick={callEditModal}
				/>
				<p>({passengers.length}/{totalSeats})</p>
				<div 
					className={`${seatCapacityBar} ` < 100 ? 'driversCard__percentBar--incomplete' : 'driversCard__percentBar--complete' }
					style={{
						width: `${seatCapacityBar}%`,
					}}>
				</div>
			</div>
			<PassengerTileContainer
				passengers={passengers}
				handleUpdate={updateDriverList}
				driverIndex={driverIndex}
			/>
		</div>
	);
}

export default DriverCard;
