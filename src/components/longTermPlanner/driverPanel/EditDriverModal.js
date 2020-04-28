import React from 'react';
import Modal from '../../reusable/Modal';

const EditDriverModal = ({isVisible, handleVisibility}) => {
	// How can we get the name of the existing driver?
	// Also, we should fix our naming conventions
	return (
		<Modal 
			isVisible={isVisible} 
			handleVisibility={handleVisibility}
			>
			<h1>Edit Driver</h1>
			<form>
				<label htmlFor="driverName">Driver's name: </label>
				<input type="text" name="driverName" id="driverName" required/>
				<label htmlFor="driverSeats">Number of available seats: </label>
				<select name="driverSeats" id="driverSeats">
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

export default EditDriverModal;
