import React from 'react';
import PassengerTile from './PassengerTile';

const Passengers = ({passengerList, deleteFreePassenger}) => {
	return (
		<div className="passengersContainer">
			<h3>Manage Passengers</h3>
				<div>
					<form>
						<input type="text" name="passengerName" id="passengerName" placeholder="Passenger's name..."/>
						<button type="submit">Add</button>
					</form>
					<div className="passengerTiles">
						{passengerList.map((passenger) => 
						<PassengerTile
							key={passenger.id}
							id={passenger.id}
							name={passenger.name}
							deleteFreePassenger={deleteFreePassenger}
						/>
						)}
					</div>
				</div>
		</div>
	);
}

export default Passengers;
