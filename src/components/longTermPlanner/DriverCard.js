import React from 'react';
import PassengerTile from './PassengerTile';

const DriverCard = ({name, passengers, totalSeats}) => {
	return (
		<div className="driversCard">
			<div className="driversCard__header">
				<p>{name}</p>
				<p>edit</p>
				<p>({passengers.length}/{totalSeats})</p>
				<div className="driversCard__percentBar"></div>
			</div>
			<div className="passengerTiles">
				{passengers.map((passenger, i) => 
					<PassengerTile
						key={i}
						name={passenger}
					/>
					)}
			</div>
		</div>
	);
}

export default DriverCard;
