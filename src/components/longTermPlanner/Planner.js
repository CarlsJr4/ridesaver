import React from 'react';
import Drivers from './Drivers';
import Passengers from './Passengers';
import Navbar from '../general/Navbar'

const Planner = () => {
	return (
		<div className="longTermPlanner">
			<Navbar />
			<p>Ice Skating With Friends | February 12th, 2020 | 6:00pm</p>
			<div className="longTermPlanner__cards">
				<Drivers />
				<Passengers />
			</div>
		</div>
	);
}

export default Planner;
