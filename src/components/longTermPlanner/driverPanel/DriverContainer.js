import React, { useState, useContext } from 'react';
import DriverStatusBar from './DriverStatusBar';
import DriverCard from './DriverCard';
import IconButton from '../../reusable/IconButton';
import AddDriverModal from './modals/AddDriverModal';
import LinkModal from './modals/LinkModal';
import EditDriverModal from './modals/EditDriverModal';
import { CarpoolContext } from '../../context/GlobalState';

const DriverContainer = () => {
	// Toggle visibility of modals - This is OK for now. But if we had like 6 modals, it would be good to use a reducer. 
	const [isAddingDriver, toggleAddModal] = useState(false);
	const [isViewingRestLink, toggleRestLink] = useState(false);
	const [isEditingDriver, toggleEditDriver] = useState(false);
	
	const [driverBeingEdited, updateDriverBeingEdited] = useState({});

	const { driverList, updateDriverList } = useContext(CarpoolContext);

	return (
		<div className="planner__left">
			<AddDriverModal
				isVisible={isAddingDriver}
				handleVisibility={toggleAddModal}
				handleAdd={updateDriverList}
			/>
			<LinkModal 
				isVisible={isViewingRestLink}
				handleVisibility={toggleRestLink}
			/>
			<EditDriverModal 
				isVisible={isEditingDriver}
				handleVisibility={toggleEditDriver}
				driver={driverBeingEdited}
			/>
			<div className="drivers__header">
				<h3>Manage Drivers</h3>
				<IconButton
					icon="link"
					handleClick={() => toggleRestLink(true)}
				/>
				<IconButton 
					icon="plus"
					handleClick={() => toggleAddModal(true)}	
				/>
			</div>
			<DriverStatusBar />
			<div className="drivers__container">
				{driverList.map((driver, i) => 
					<DriverCard
						key={driver.id}
						id={driver.id}
						driverIndex={i}
						name={driver.name}
						passengers={driver.passengers}
						totalSeats={driver.seats}
						toggleEditDriver={toggleEditDriver}
						updateDriverBeingEdited={updateDriverBeingEdited}
					/>
				)}
			</div>
	</div>
	);
}

export default DriverContainer;
