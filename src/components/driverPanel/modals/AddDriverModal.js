import React from 'react';
import Modal from '../../reusable/Modal';
import useFormData from '../../../hooks/useFormData';

const AddDriverModal = ({isVisible, handleVisibility, handleAdd}) => {
	const {formData, setFormData, handleInputChange} = useFormData();

	function handleSubmit(e) {
		e.preventDefault()
		e.target.reset();
		setFormData({});
		return handleAdd({type: 'ADD', formData});
	}

	return (
		<Modal 
				isVisible={isVisible} 
				handleVisibility={handleVisibility}
			>
				<h1>Add Drivers</h1>
				<form onSubmit={(e) => handleSubmit(e)}>
					<label htmlFor="driverName">Driver's name: </label>
					<input 
						type="text" 
						name="driverName" 
						id="driverName" 
						value={formData.driverName || ''} 
						onChange={(e) => handleInputChange(e)} 
						required
					/>
					<label htmlFor="driverSeats">Number of available seats: </label>
					<select 
						name="driverSeats" 
						id="driverSeats" 
						value={formData.driverSeats} 
						onChange={(e) => handleInputChange(e)} 
						required
					>
						<option value="">-</option>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
						<option value="6">6</option>
						<option value="7">7</option>
					</select>
					<input type="submit" value="Add"/>
				</form>	
			</Modal>
	);
}

export default AddDriverModal;
