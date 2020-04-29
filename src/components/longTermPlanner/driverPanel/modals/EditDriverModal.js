import React, { useEffect, useContext } from 'react';
import Modal from '../../../reusable/Modal';
import useFormData from '../../../../hooks/useFormData';
import { CarpoolContext } from '../../../context/GlobalState';

// The whole data flow of this is kind of confusing. Can we refactor this?
const EditDriverModal = ({isVisible, handleVisibility, driver}) => {
	const {formData, setFormData, handleInputChange} = useFormData();

	useEffect(() => setFormData({
		driverName: driver.name,
		driverSeats: driver.totalSeats
	}), [driver, setFormData])

	const { updateDriverList } = useContext(CarpoolContext);

	return (
		<Modal 
			isVisible={isVisible} 
			handleVisibility={handleVisibility}
			>
			<h1>Edit Driver</h1>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					setFormData({});
					handleVisibility(false);
					updateDriverList({type: 'EDIT', index: driver.driverIndex, formData})
				}}
			>
				<label htmlFor="driverName">Driver's name: </label>
				<input 
					type="text" 
					name="driverName" 
					id="driverName" 
					value={formData.driverName || ''} 
					onChange={handleInputChange}
					required
				/>
				<label 
					htmlFor="driverSeats"
				>
					Number of available seats: 
				</label>
				<select 
					name="driverSeats" 
					id="driverSeats"
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
				<input type="submit" value="Update"/>
				<button
					// We set type to button so that the browser doesn't submit an unvalidated form and throw an error 
				  type="button"
					onClick={() => {
						setFormData({});
						handleVisibility(false);
						updateDriverList({type: 'DELETE', id: driver.id})
						}}>
							Delete Driver
					</button>
			</form>	
		</Modal>
	);
}

export default EditDriverModal;
