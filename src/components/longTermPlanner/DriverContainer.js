import React from 'react';
import DriverStatusBar from './DriverStatusBar';
import DriverCard from './DriverCard';

const DriverContainer = ({passengerList, driverList}) => {
	return (
		<div className="planner__left">
			<div className="drivers__header">
				<h3>Manage Drivers</h3>
				<button>Link</button>
				<button>Add</button>
			</div>
			<DriverStatusBar 
				passengerList={passengerList}
				driverList={driverList}
			/>
			<div className="drivers__container">
				{driverList.map((driver, i) => 
					<DriverCard
						key={i}
						name={driver.name}
						passengers={driver.passengers}
						totalSeats={driver.seats}
					/>
				)}
			</div>
	</div>
	);
}

export default DriverContainer;
