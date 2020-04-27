import React from 'react';
import PassengerTileContainer from './PassengerTileContainer';

const Passengers = ({passengerList}) => {
	return (
		<div className="passengersContainer">
			<h3>Manage Passengers</h3>
				<div>
					<form>
						<input type="text" name="passengerName" id="passengerName" placeholder="Passenger's name..."/>
						<button type="submit">Add</button>
					</form>
					<PassengerTileContainer
						passengers={passengerList} 
					/>
				</div>
		</div>
	);
}

export default Passengers;
