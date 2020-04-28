import React, { useState, useEffect } from 'react';
import PassengerTileContainer from '../passengerPanel/PassengerTileContainer';
import IconButton from '../../reusable/IconButton';

// How do we pass the driver's ID to the passenger tile container?
const DriverCard = ({name, passengers, totalSeats, handleDelete, driverIndex, toggleEditDriver}) => {
	// To conditionally update the progress bar's width styling
	const [seatCapacityBar, updateCapacityBar] = useState(0);
	useEffect(() => updateCapacityBar((passengers.length / totalSeats) * 100), [passengers.length, totalSeats]);

	return (
		<div className="driversCard">
			<div className="driversCard__header">
				<p>{name}</p>
				<IconButton
					icon="user-edit"
					handleClick={() => toggleEditDriver(true)}
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
				handleDelete={handleDelete}
				driverIndex={driverIndex}
			/>
		</div>
	);
}

export default DriverCard;
