import React from 'react';
import DriverStatusBar from './DriverStatusBar';
import DriverCard from './DriverCard';

const DriverContainer = ({passengerList, driverList}) => {
	return (
		<div className="planner__left">
			<div className="drivers__header">
				<h3>Manage Drivers</h3>
				<p>Link</p>
				<p>Add</p>
			</div>
			<DriverStatusBar 
				passengerList={passengerList}
				driverList={driverList}
			/>
			<div className="drivers__container">
				<DriverCard />
				<DriverCard />
				<DriverCard />
				<DriverCard />
			</div>
	</div>
	);
}

export default DriverContainer;
