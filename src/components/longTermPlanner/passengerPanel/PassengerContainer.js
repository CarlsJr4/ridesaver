import React from 'react';
import PassengerTileContainer from './PassengerTileContainer';
import useFormData from '../../../hooks/useFormData';

const Passengers = ({passengerList, handleDelete, handleAddPassenger}) => {
	const {formData, setFormData, handleInputChange} = useFormData();

	return (
		<div className="passengersContainer">
			<h3>Manage Passengers</h3>
				<div>
					<form
						onSubmit={(e) => {
							setFormData({});
							return handleAddPassenger(e, formData);
						}}
					>
						<input 
							type="text" 
							name="passengerName" 
							id="passengerName" 
							placeholder="Passenger's name..."
							value={formData.name}
							onChange={handleInputChange}
						/>
						<button type="submit">Add</button>
					</form>
					<PassengerTileContainer
						passengers={passengerList} 
						handleDelete={handleDelete}
					/>
				</div>
		</div>
	);
}

export default Passengers;
