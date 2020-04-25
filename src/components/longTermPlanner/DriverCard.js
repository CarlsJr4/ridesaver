import React from 'react';

const DriverCard = () => {
	return (
		<div className="driversCard">
		<div className="driversCard__header">
			<p>Josh</p>
			<p>edit</p>
			<p>(3/3)</p>
			<div className="driversCard__percentBar"></div>
		</div>
		<div className="passengerTiles">
			<div className="passengerTiles__card">
				<p>Kevin</p>
				<p>X</p>
			</div>
			<div className="passengerTiles__card">
				<p>Kevin</p>
				<p>X</p>
			</div>
			<div className="passengerTiles__card">
				<p>Kevin</p>
				<p>X</p>
			</div>
		</div>
	</div>
	);
}

export default DriverCard;
