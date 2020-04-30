import React, { useContext } from 'react';
import PassengerTileContainer from './PassengerTileContainer';
import useFormData from '../../hooks/useFormData';
import { CarpoolContext } from '../context/GlobalState';
import { Droppable } from 'react-beautiful-dnd';

const Passengers = () => {
	const { formData, setFormData, handleInputChange } = useFormData();
	const { updatePassengerList, passengerList } = useContext(CarpoolContext);

	function handleAdd(e) {
		setFormData({});
		e.preventDefault();
		e.target.reset();
		return updatePassengerList({
			type: 'ADD', 
			formData 
		});
	}

	return (
		<div className="passengersContainer">
			<h3>Manage Passengers</h3>
			{passengerList.columnOrder.map((columnId) => {
				const column = passengerList.passengerColumns[columnId];
				const rows = column.passengerIds.map(passenger => passengerList.passengerRows[passenger]);
				return (
					<Droppable
					droppableId="passengerDroppable"
					key={columnId}
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
										handleUpdate={updatePassengerList}
										passengers={rows}
										placeholder={provided.placeholder}
									/>
					</div>
					)}
				</Droppable>
				)
			})
			}
		</div>
	);
}

export default Passengers;
