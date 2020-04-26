import React from 'react';

// Consider not making this a separate component and just rendering divs with a class
// Unless, you need to make it a separate component for drag and drop 
const PassengerTile = ({name, deleteFreePassenger, id}) => {
	return (
		<div className="passengerTiles__card">
			<p><span className="grippy"></span>{name}</p>
			<button onClick={() => deleteFreePassenger(id)}>X</button>
		</div>
	);
}

export default PassengerTile;
