import React, { useContext } from 'react';
import PassengerTileContainer from './PassengerTileContainer';
import useFormData from '../../hooks/useFormData';
import { CarpoolContext } from '../context/GlobalState';
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

	const passengerIds = driverList.driverColumns.freePassengers.passengerIds;
	const passengerData = passengerIds.map(id => driverList.passengerRows[id]);
	const columnId = "freePassengers";

	return ( 
		<div className="passengersContainer">
			<h3>Manage Passengers</h3>
				<Droppable
					droppableId={columnId}
				>
					{(provided) => (
						<div>
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
									required
								/>
								<button type="submit">Add</button>
							</form>
									<PassengerTileContainer 
										{...provided.droppableProps}
										innerRef={provided.innerRef}
										handleUpdate={updateDriverList}
										passengers={passengerData}
										placeholder={provided.placeholder}
										driverId={columnId}
									/>
						</div>
					)}
				</Droppable>
		</div>
	);
}

export default Passengers;
