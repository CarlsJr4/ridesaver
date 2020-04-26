import React, { useState } from 'react';
import DriverContainer from './DriverContainer';
import PassengerContainer from './PassengerContainer';
import Navbar from '../general/Navbar';

// Goal: Figure out everything stateful 
// Refactor components if needed

// What do we need to keep track of?
// Driver names, taken seats (can be calculated with math), and total seats
// Driver passenger list of names
// Vacant passenger list of names
// Controlled components form state
// Probably need state to be in the Planner component because drivers and passengers components need to communicate with eachother

// We need to be able to update any part of a driver's info at will 
// Should store driver info in an object, then update its individual keys
// Probably need to use useReducer for these complex state updates

// Driver
	// name
	// seatCount
	// passengers

const driverList = [
	{
	name: 'Driver1',
	seats: 3,
	passengers: ['pass1', 'pass2', 'pass3']
	},
	{
	name: 'Driver2',
	seats: 3,
	passengers: ['pass1', 'pass2', 'pass3']
	},
];

const passengerList = ['pass1', 'pass2', 'pass3'];

const Planner = () => {

	return (
		<>
			{/* <Navbar /> */}
			<div className="longTermPlanner">
				<p>Ice Skating With Friends | February 12th, 2020 | 6:00pm</p>
				<div className="longTermPlanner__cards">
					<DriverContainer
						driverList={driverList}
						passengerList={passengerList}
					/>
					<PassengerContainer
						passengerList={passengerList}
					/>
				</div>
			</div>
		</>
	);
}

export default Planner;
