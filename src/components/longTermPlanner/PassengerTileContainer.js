import React from 'react';

// Eventually we will need to wrap the div in a draggable component
const PassengerTileContainer = ({passengers}) => {
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
							<button>
								X
							</button>
						</div> 
					)
				}
			</div>
	);
}

export default PassengerTileContainer;
