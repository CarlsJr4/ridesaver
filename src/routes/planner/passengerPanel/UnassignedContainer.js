import React, { useContext } from 'react';
import PassengerContainer from '../PassengerContainer';
import useFormData from '../../../custom_hooks/useFormData';
import { CarpoolContext } from '../../../context/GlobalState';
import { Droppable } from 'react-beautiful-dnd';

const Passengers = () => {
	const { formData, setFormData, handleInputChange } = useFormData();
	const { updateDriverList, driverList } = useContext(CarpoolContext);

	function handleAdd(e) {
		setFormData({});
		e.preventDefault();
		e.target.reset();
		return updateDriverList({
			type: 'ADD_PASSENGER', 
			name: formData.passengerName 
		});
	}

	const passengerIds = driverList.driverColumns.unassignedPassengers.passengerIds;
	const passengerData = passengerIds.map(id => driverList.passengerRows[id]);
	const columnId = "unassignedPassengers";

	return ( 
		<div className="passengersContainer">
			<h3>Unassigned Passengers</h3>
				<form
					onSubmit={(e) => handleAdd(e)}
				>
					<input 
						type="text" 
						name="passengerName" 
						id="passengerName" 
						placeholder="Passenger's name..."
						value={formData.name}
						onChange={handleInputChange}
						maxLength="20"
						required
					/>
					<button type="submit">Add</button>
				</form>
				<Droppable
					droppableId={columnId}
				>
					{(provided, snapshot) => (
						<PassengerContainer 
							{...provided.droppableProps}
							innerRef={provided.innerRef}
							handleUpdate={updateDriverList}
							passengers={passengerData}
							placeholder={provided.placeholder}
							driverId={columnId}
							isDraggingOver={snapshot.isDraggingOver}
						/>
					)}
				</Droppable>
		</div>
	);
}

export default Passengers;
