import React, { useState } from 'react';

// Contains top-level data from the backend
// Wrapper component that serves as a context provider

export const CarpoolContext = React.createContext();

const fakeDriverList = [
	{
	name: 'Driver1',
	seats: 3,
	id: 100,
	passengers: [{name: 'pass1', id: 4}, {name: 'pass2', id: 5}]
	},
	{
	name: 'Driver2',
	seats: 3,
	id: 200,
	passengers: [{name: 'pass1', id: 6}, {name: 'pass2', id: 7}, {name: 'pass3', id: 8}]
	},
];

const fakePassengerList = [{name: 'pass1', id: 1}, {name: 'pass2', id: 2}, {name: 'pass3', id: 3}];

const GlobalState = ({children}) => {
	const [driverList, updateDriverList] = useState(fakeDriverList);
	const [passengerList, updatePassengerList] = useState(fakePassengerList);

	const addDriver = (e, formData) => {
		e.preventDefault();
		const updatedList = [...driverList];
		updatedList.push({
			name: formData.driverName,
			seats: parseInt(formData.driverSeats),
			id: driverList.length + 1,
			passengers: []
		});
		updateDriverList(updatedList);
	}

	const addPassenger = (e, formData) =>{
		console.log(e, formData);
		e.target.reset();
		e.preventDefault();
		const updatedList = [...passengerList];
		updatedList.push({
			name: formData.passengerName,
			id: passengerList.length + 1
		});
		updatePassengerList(updatedList);
	}

	const deleteUnseatedPassenger = (id) => {
		const updatedList = passengerList.filter(item => item.id !== id);
		updatePassengerList(updatedList);
	}

	const deleteSeatedPassenger = (id, index) => {
		const drivers = [...driverList]; 

		let updatedPassengers = drivers[index].passengers; 
		updatedPassengers = updatedPassengers.filter(item => item.id !== id); 

		drivers[index] = {...drivers[index], passengers: updatedPassengers}

		updateDriverList(drivers); 
	}

	return (
		<CarpoolContext.Provider 
			value={{
				driverList, 
				passengerList,
				addDriver,
				addPassenger,
				deleteSeatedPassenger,
				deleteUnseatedPassenger
			}}
		>
			{children}
		</CarpoolContext.Provider>
	);
}

export default GlobalState;

