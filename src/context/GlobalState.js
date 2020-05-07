import React, { useReducer, useEffect } from 'react';
import driverReducer from '../context/reducers/driverReducer';

export const CarpoolContext = React.createContext();

const initialData = [
	{
	name: 'driver1',
	nickname: 'BillyTheDestroyer',
	seats: 3,
	id: 'driver1',
	passengers: [{name: 'pass1', id: 'pass1'}, {name: 'pass2', id: 'pass2'}]
	},
	{
	name: 'driver2',
	nickname: null,
	seats: 3,
	id: 'driver2',
	passengers: [{name: 'passX', id:'passX'}]
	},
	// This is a unique column. Handle with care!
	{
		name: 'unassignedPassengers',
		seats: null,
		id: 'unassignedPassengers',
		passengers: [{name: 'pass3', id: 'pass3'}, {name: 'pass4', id: 'pass4'}]
	}
];

// Only includes state that is read at multiple levels of the app
const GlobalState = ({children}) => {
	const [driverList, updateDriverList] = useReducer(driverReducer, {
		passengerRows: {},
		// We include this placeholder object so the passengerList can parse through it without returning any errors
		driverColumns: {
			unassignedPassengers: {
				id: "unassignedPassengers",
				name: "unassignedPassengers",
				passengerIds: []
			}
		},
		columnOrder: []
	});

	function fakeApiCall() {
		// API call would go here, then we'd send the data to our reducer to process
		updateDriverList({
			type: 'INIT',
			drivers: initialData
		})
	}

	useEffect(() => fakeApiCall(), []);

	return (
		<CarpoolContext.Provider 
			value={{
				driverList, 
				updateDriverList,
			}}
		>
			{children}
		</CarpoolContext.Provider>
	);
}

export default GlobalState;

