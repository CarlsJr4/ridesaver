import React, { useState } from 'react';
import DriverContainer from './driverPanel/DriverContainer';
import PassengerContainer from './passengerPanel/PassengerContainer';
// import IconButton from '../reusable/IconButton';
// import Navbar from '../reusable/Navbar';

// TODO:
// Make components drag and drop

const fakeDriverList = [
	{
	name: 'Driver1',
	seats: 3,
	id: 100,
	passengers: [{name: 'pass1', id: 4}, {name: 'pass2', id: 5}]
	},
	{
	name: 'Driver2',
	seats: 3,
	id: 200,
	passengers: [{name: 'pass1', id: 6}, {name: 'pass2', id: 7}, {name: 'pass3', id: 8}]
	},
];

const fakePassengerList = [{name: 'pass1', id: 1}, {name: 'pass2', id: 2}, {name: 'pass3', id: 3}];

const Planner = () => {
	// Normally, we'd make an API call here and store the data in the state
	// For now, we will just provide state directly

	const [driverList, updateDriverList] = useState(fakeDriverList);
	const [passengerList, updatePassengerList] = useState(fakePassengerList);
	
	const addDriver = (e, formData) => {
		e.preventDefault();
		const updatedList = [...driverList];
		updatedList.push({
			name: formData.driverName,
			seats: parseInt(formData.driverSeats),
			id: driverList.length + 1,
			passengers: []
		});
		updateDriverList(updatedList);
	}

	const deleteUnseatedPassenger = (id) => {
		const updatedList = passengerList.filter(item => item.id !== id);
		updatePassengerList(updatedList);
	}

	const deleteSeatedPassenger = (id, index) => {
		const drivers = [...driverList]; 

		let updatedPassengers = drivers[index].passengers; 
		updatedPassengers = updatedPassengers.filter(item => item.id !== id); 

		drivers[index] = {...drivers[index], passengers: updatedPassengers}

		updateDriverList(drivers); 
	}

	return (
		<>
			{/* <Navbar /> */}
			<div className="longTermPlanner">
				<p>Ice Skating With Friends | February 12th, 2020 | 6:00pm {/* <span><IconButton icon="user-edit"/></span> */}</p>
				<div className="longTermPlanner__cards">
					<DriverContainer
						driverList={driverList}
						passengerList={passengerList}
						handleDelete={deleteSeatedPassenger}
						handleAddDriver={addDriver}
					/>
					<PassengerContainer
						passengerList={passengerList}
						handleDelete={deleteUnseatedPassenger}
					/>
				</div>
			</div>
		</>
	);
}

export default Planner;
