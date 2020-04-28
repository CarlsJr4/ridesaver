import React, { useContext } from 'react';
import PassengerTileContainer from './PassengerTileContainer';
import useFormData from '../../../hooks/useFormData';
import { CarpoolContext } from '../../context/GlobalState';

const Passengers = () => {
	const { formData, setFormData, handleInputChange } = useFormData();
	const { addPassenger, deleteUnseatedPassenger, passengerList } = useContext(CarpoolContext)

	return (
		<div className="passengersContainer">
			<h3>Manage Passengers</h3>
				<div>
					<form
						onSubmit={(e) => {
							setFormData({});
							return addPassenger(e, formData);
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
						handleDelete={deleteUnseatedPassenger} 
						passengers={passengerList}
					/>
				</div>
		</div>
	);
}

export default Passengers;
