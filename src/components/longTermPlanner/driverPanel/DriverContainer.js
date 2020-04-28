import React, { useState } from 'react';
import DriverStatusBar from './DriverStatusBar';
import DriverCard from './DriverCard';
import IconButton from '../../reusable/IconButton';
import Modal from '../../reusable/Modal';

const DriverContainer = ({passengerList, driverList, handleDelete}) => {
	const [isAddingDriver, toggleAddModal] = useState(true);

	return (
		<div className="planner__left">
			{/* There will be a lot of modals here, probably good to separate into components */}
			<Modal 
				isEditing={isAddingDriver} 
				handleVisibility={toggleAddModal}
			>
				<h1>Add Driver</h1>
				<form>
					<label htmlFor="driverName">Driver's name: </label>
					<input type="text" name="driverName" id="driverName" required/>
					<label htmlFor="driverSeats">Number of available seats: </label>
					<select name="driverSeats" id="driverSeats">
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
						<option value="6">6</option>
						<option value="7">7</option>
					</select>
					<input type="submit" value="Add"/>
				</form>	
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
