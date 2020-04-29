import React, { useState, useEffect, useContext } from 'react';
import PassengerTileContainer from '../passengerPanel/PassengerTileContainer';
import IconButton from '../../reusable/IconButton';
import { CarpoolContext } from '../../context/GlobalState';

// How can we get a driverCard to send the driver's ID to the modal?
const DriverCard = ({name, passengers, totalSeats, driverIndex, toggleEditDriver}) => {
	const [seatCapacityBar, updateCapacityBar] = useState(0); // Capacity bar width
	const {updateDriverList} = useContext(CarpoolContext);
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
				handleUpdate={updateDriverList}
				driverIndex={driverIndex}
			/>
		</div>
	);
}

export default DriverCard;
