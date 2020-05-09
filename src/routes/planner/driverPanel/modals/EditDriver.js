import React, { useEffect, useContext } from 'react';
import Modal from '../../../../reusable_components/Modal';
import useFormData from '../../../../custom_hooks/useFormData';
import { CarpoolContext } from '../../../../context/GlobalState';

const EditDriverModal = ({isVisible, handleVisibility, driver}) => {
	const {formData, setFormData, handleInputChange} = useFormData();

	// This block is used for conditional rendering of the delete button
	let occupied;
	if (driver.passengers && driver.passengers.length > 0) {
		occupied = true
	}

	// Auto-fill the form with the selected driver's data
	useEffect(() => setFormData({
		driverName: driver.name,
		driverNickname: driver.nickname,
		driverSeats: driver.totalSeats
	}), [driver, setFormData])

	const { updateDriverList } = useContext(CarpoolContext);

	function handleSubmit(e) {
		e.preventDefault();
		setFormData({});
		handleVisibility(false);
		updateDriverList({type: 'EDIT_DRIVER', driverId: driver.id, formData})
	}

	function handleDeleteDriver() {
		setFormData({});
		handleVisibility(false); // Immediately close the modal for better UX
		updateDriverList({type: 'DELETE_DRIVER', driverId: driver.id})
	}

	return (
		<Modal 
			isVisible={isVisible} 
			handleVisibility={handleVisibility}
			>
			<h1>
				Edit Driver
			</h1>
			<form
				onSubmit={(e) => handleSubmit(e)}
			>
				<label htmlFor="driverName">
					Name: 
				</label>
				<input 
					type="text" 
					name="driverName" 
					id="driverName__Edit" 
					value={formData.driverName || ''} // There is an || operator here to keep the component controlled
					onChange={handleInputChange}
					maxLength="20"
					required
				/>
				<label htmlFor="driverNickname">
					Nickname (optional): 
				</label>
				<input 
					type="text" 
					name="driverNickname" 
					id="driverNickname__Edit" 
					value={formData.driverNickname || ''} // There is an || operator here to keep the component controlled
					onChange={handleInputChange}
					maxLength="20"
				/>
				<label 
					htmlFor="driverSeats"
				>
					Number of available seats: 
				</label>
				<select 
					name="driverSeats" 
					id="driverSeats__Edit"
					defaultValue={driver.totalSeats}
					value={formData.driverSeats}
					onChange={handleInputChange}
				>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
					<option value="6">6</option>
					<option value="7">7</option>
				</select>
				<input 
					type="submit" 
					value="Update"
				/>
				{occupied ? 
				<p>To delete this driver, remove their passengers first.</p> :
					<button
						type="button" 
						onClick={handleDeleteDriver}
						>
							Delete Driver
					</button>
				}
			</form>	
		</Modal>
	);
}

export default EditDriverModal;
