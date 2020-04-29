import React, { useContext } from 'react';
import PassengerTileContainer from './PassengerTileContainer';
import useFormData from '../../hooks/useFormData';
import { CarpoolContext } from '../context/GlobalState';

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
						/>
						<button type="submit">Add</button>
					</form>
					<PassengerTileContainer 
						handleUpdate={updatePassengerList}
						passengers={passengerList}
					/>
				</div>
		</div>
	);
}

export default Passengers;
