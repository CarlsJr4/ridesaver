import React, { useContext } from 'react';
import IconButton from '../../reusable/IconButton';

// The passengers prop is either all the unseated passengers or the driver's specific passengers. The type depends on the props. 
const PassengerTileContainer = ({handleDelete, driverIndex, passengers}) => {
	return (
		<div className="passengerTiles">
				{passengers.map((passenger) =>
						<div 
							key={passenger.id} 
							id={passenger.id} 
							className="passengerTiles__card"
						>
							<p>
								<span className="grippy"></span>
								{passenger.name}
							</p>
							<IconButton
							 handleClick={() => handleDelete(passenger.id, driverIndex)} 
							 icon="trash" 
							/>
						</div> 
					)
				}
			</div>
	);
}

export default PassengerTileContainer;
