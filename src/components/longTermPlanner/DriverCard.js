import React, { useState, useEffect } from 'react';
import PassengerTileContainer from './PassengerTileContainer';

const DriverCard = ({name, passengers, totalSeats}) => {
	// To conditionally update the progress bar's width styling
	const [seatCapacityBar, updateCapacityBar] = useState(0);
	useEffect(() => updateCapacityBar((passengers.length / totalSeats) * 100));

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
			/>
		</div>
	);
}

export default DriverCard;
