import React, { useState } from 'react';
import DriverContainer from './DriverContainer';
import PassengerContainer from './PassengerContainer';
import Navbar from '../general/Navbar';

// TODO:
// Set up React Context?
// Make components drag and drop
// Delete passengers from driver cards
// Add passengers by form
// Edit driver
// Add driver
// Display a fake link for users to add their own passengers and drivers

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

	const deleteUnseatedPassenger = (id) => {
		const updatedList = passengerList.filter(item => item.id !== id);
		updatePassengerList(updatedList)
	}

	const deleteSeatedPassenger = (id, driverIndex) => {
		const updatedDrivers = [...driverList]; // Clone the state array
		let driver = updatedDrivers[driverIndex]; // Reference the driver
		let updatedPassengers = driver.passengers; // Reference the driver's passengers
		updatedPassengers = updatedPassengers.filter(item => item.id !== id); // Filter the passengers array
		driver.passengers = updatedPassengers // Reassign with dot notation
		updateDriverList(updatedDrivers); // Update the state
	}

	return (
		<>
			{/* <Navbar /> */}
			<div className="longTermPlanner">
				<p>Ice Skating With Friends | February 12th, 2020 | 6:00pm</p>
				<div className="longTermPlanner__cards">
					<DriverContainer
						driverList={driverList}
						passengerList={passengerList}
						handleDelete={deleteSeatedPassenger}
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
