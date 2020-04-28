import React, { useState } from 'react';
import DriverStatusBar from './DriverStatusBar';
import DriverCard from './DriverCard';
import IconButton from '../reusable/IconButton';
import Modal from '../reusable/Modal';

// ReactJS modals
// How do we trigger a modal's visibility?
// Toggle its class 
// How can we toggle the class?
// Store a boolean in state, attach it to the class
// Store class as a prop
// Where will we keep track of which modal is open? Here?
// Only this component needs to know whether or not we are editing
// The data itself belongs in the Planner

const DriverContainer = ({passengerList, driverList, handleDelete}) => {
	const [isAddingDriver, toggleAddModal] = useState(false);

	return (
		<div className="planner__left">
			<Modal 
				isEditing={isAddingDriver} 
				handleVisibility={toggleAddModal}
			>
				<h1>This is just a test</h1>
				<p>This is also just a test</p>	
			</Modal>
			<div className="drivers__header">
				<h3>Manage Drivers</h3>
				<IconButton
					icon="link"
				/>
				<IconButton 
					icon="plus"
					handleClick={() => toggleAddModal(true)}	
				/>
			</div>
			<DriverStatusBar 
				passengerList={passengerList}
				driverList={driverList}
			/>
			<div className="drivers__container">
				{driverList.map((driver, i) => 
					<DriverCard
						key={driver.id}
						id={driver.id}
						driverIndex={i}
						name={driver.name}
						passengers={driver.passengers}
						totalSeats={driver.seats}
						handleDelete={handleDelete}
					/>
				)}
			</div>
	</div>
	);
}

export default DriverContainer;
