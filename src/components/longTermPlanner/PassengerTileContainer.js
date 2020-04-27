import React from 'react';

// Eventually we will need to wrap the div in a draggable component
// driverIndex is an optional prop, including it will allow you to delete from a certain list, but not including it will not cause any errors
const PassengerTileContainer = ({passengers, handleDelete, driverIndex}) => {
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
							<button onClick={() => handleDelete(passenger.id, driverIndex)}>
								X
							</button>
						</div> 
					)
				}
			</div>
	);
}

export default PassengerTileContainer;
