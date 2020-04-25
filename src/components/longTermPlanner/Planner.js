import React from 'react';
import DriverContainer from './DriverContainer';
import PassengerContainer from './PassengerContainer';
import Navbar from '../general/Navbar'

const Planner = () => {
	return (
		<>
			{/* <Navbar /> */}
			<div className="longTermPlanner">
				<p>Ice Skating With Friends | February 12th, 2020 | 6:00pm</p>
				<div className="longTermPlanner__cards">
					<DriverContainer />
					<PassengerContainer />
				</div>
			</div>
		</>
	);
}

export default Planner;
