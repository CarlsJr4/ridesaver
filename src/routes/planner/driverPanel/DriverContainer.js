import React, { useState, useContext } from 'react';
import DriverContainerStatus from './DriverContainerStatus';
import DriverCard from './DriverContainerCard';
import IconButton from '../../../reusable_components/IconButton';
import AddDriverModal from './modals/AddDriver';
import LinkModal from './modals/Link';
import EditDriverModal from './modals/EditDriver';
import { CarpoolContext } from '../../../context/GlobalState';

const DriverContainer = () => {
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
			<DriverContainerStatus />
			<div className="drivers__container">
				{driverList.columnOrder.map((columnId) => {
					const driver = driverList.driverColumns[columnId];
					const passengers = driver.passengerIds.map(passenger => driverList.passengerRows[passenger]);

					return (
						<DriverCard
							key={columnId}
							id={columnId}
							name={driver.name}
							passengers={passengers}
							totalSeats={driver.seats}
							toggleEditDriver={toggleEditDriver}
							updateDriverBeingEdited={updateDriverBeingEdited}
						/>
					)
				}
				)}
			</div>
	</div>
	);
}

export default DriverContainer;
