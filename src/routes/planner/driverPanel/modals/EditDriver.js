import React, { useEffect, useContext, useState } from 'react';
import Modal from '../../../../reusable_components/Modal';
import useFormData from '../../../../custom_hooks/useFormData';
import { CarpoolContext } from '../../../../context/GlobalState';

const EditDriverModal = ({isVisible, handleVisibility, driver}) => {
	const {formData, setFormData, handleInputChange} = useFormData();
	const [ isOverCapacity, setCapacityStatus ] = useState(false);

	useEffect(() => {
		// I use a && because the driver object is empty at first and causes an error if I dont include it
		if (driver.passengers && formData.driverSeats < driver.passengers.length) {
			setCapacityStatus(true)
		} else {
			setCapacityStatus(false)
		}
	}, [formData.driverSeats, driver.passengers])

	// This block is used for conditional rendering of the delete button
	let occupied;
	if (driver.passengers && driver.passengers.length > 0) {
		occupied = true
	}

	// Auto-fill the form with the selected driver's data
	useEffect(() => setFormData({
		driverSeats: driver.totalSeats
	}), [driver, setFormData])

	const { updateDriverList } = useContext(CarpoolContext);

	function handleSubmit(e) {
		e.preventDefault();
		setFormData({});
		handleVisibility(false);
		updateDriverList({type: 'EDIT_DRIVER_SEATS', driverId: driver.id, formData})
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
				Edit seat count
			</h1>
			<form
				onSubmit={(e) => handleSubmit(e)}
			>
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
				{isOverCapacity && <p>You can't have less seats than passengers.</p>}
				<input 
					type="submit" 
					value="Update"
					disabled={isOverCapacity}
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
