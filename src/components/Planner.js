import React, { useContext } from 'react';
import DriverContainer from './driverPanel/DriverContainer';
import PassengerContainer from './passengerPanel/PassengerContainer';
import { DragDropContext } from 'react-beautiful-dnd';
import { CarpoolContext } from '../components/context/GlobalState';
// import IconButton from '../reusable/IconButton';
// import Navbar from '../reusable/Navbar';

// TODO:
// Restructure data to be compatible with React Dnd
// Drag and drop state
// Deploy and get critiqued
// Form validation (after critique)
// Backend
// Aesthetics

const Planner = () => {
	const { updateDriverList, updatePassengerList } = useContext(CarpoolContext);

	const onDragEnd = (result) => {
		const {source, destination, draggableId} = result;
		console.log(result);
	
		// Outside drops
		if (!destination) {
			return
		}

		// Drop in same place
		if (
				destination.droppableId === source.droppableId &&
				destination.index === source.index
			) {
				return;
			}

		console.log(result);
		// Reorder within drivers
		const start = source.droppableId;
		const end = destination.droppableId;

		if (start === 'passengerDroppable') {
			updatePassengerList({
				type: 'REORDER',
				source,
				destination,
				draggableId
			})
			return
		}

		updateDriverList({
			type: 'REORDER_PASSENGERS', 
			source, 
			destination,
			draggableId
		})
	}

	return (
		<>
			{/* <Navbar /> */}
			<div className="longTermPlanner">
				<p>Ice Skating With Friends | February 12th, 2020 | 6:00pm {/* <span><IconButton icon="user-edit"/></span> */}</p>
				<div className="longTermPlanner__cards">
					<DragDropContext
						onDragEnd={onDragEnd}
					>
						<DriverContainer />
						<PassengerContainer />
					</DragDropContext>
				</div>
			</div>
		</>
	);
}

export default Planner;
