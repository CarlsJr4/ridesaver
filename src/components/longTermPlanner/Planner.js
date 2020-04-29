import React from 'react';
import DriverContainer from './driverPanel/DriverContainer';
import PassengerContainer from './passengerPanel/PassengerContainer';
// import IconButton from '../reusable/IconButton';
// import Navbar from '../reusable/Navbar';

// TODO:
// Delete driver
// Drag and drop
// Deploy and get critiqued
// Form validation (after critique)
// Backend
// Aesthetics

const Planner = () => {
	// Normally, we'd make an API call here and store the data in the state
	// For now, we will just provide state directly
	
	return (
		<>
			{/* <Navbar /> */}
			<div className="longTermPlanner">
				<p>Ice Skating With Friends | February 12th, 2020 | 6:00pm {/* <span><IconButton icon="user-edit"/></span> */}</p>
				<div className="longTermPlanner__cards">
					<DriverContainer />
					<PassengerContainer />
				</div>
			</div>
		</>
	);
}

export default Planner;
