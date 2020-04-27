import React, { useState, useEffect } from 'react';
import PassengerTileContainer from './PassengerTileContainer';

// How do we pass the driver's ID to the passenger tile container?
const DriverCard = ({name, passengers, totalSeats, handleDelete, driverIndex}) => {
	// To conditionally update the progress bar's width styling
	const [seatCapacityBar, updateCapacityBar] = useState(0);
	useEffect(() => updateCapacityBar((passengers.length / totalSeats) * 100), [passengers.length, totalSeats]);

	return (
		<div className="driversCard">
			<div className="driversCard__header">
				<p>{name}</p>
				<button>edit</button>
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
