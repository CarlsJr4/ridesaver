import React, { useState, useEffect, useContext } from 'react';
import PassengerTileContainer from '../passengerPanel/PassengerTileContainer';
import IconButton from '../reusable/IconButton';
import { CarpoolContext } from '../context/GlobalState';

const DriverCard = ({name, id, passengers, totalSeats, driverIndex, toggleEditDriver, updateDriverBeingEdited}) => {
	const [seatCapacityBar, updateCapacityBar] = useState(0); // Capacity bar width
	const {updateDriverList} = useContext(CarpoolContext);
	useEffect(() => updateCapacityBar((passengers.length / totalSeats) * 100), [passengers.length, totalSeats]);

	function callEditModal() {
		toggleEditDriver(true);
		updateDriverBeingEdited({
			name,
			totalSeats,
			driverIndex,
			id,
			passengers
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
			<PassengerTileContainer
				passengers={passengers}
				handleUpdate={updateDriverList}
				driverIndex={driverIndex}
			/>
		</div>
	);
}

export default DriverCard;
