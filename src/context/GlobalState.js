import React, { useReducer, useEffect } from 'react';
import driverReducer from '../context/reducers/driverReducer';

export const CarpoolContext = React.createContext();

const initialData = [
	{
	name: 'Jim Halpert',
	nickname: null,
	seats: 3,
	id: 'driver1',
	passengers: [{name: 'Michael Scott', nickname: 'Prison Mike', id: 'pass1'}, {name: 'Dwight Schrute', nickname: null, id: 'pass2'}]
	},
	{
	name: 'driver2',
	nickname: null,
	seats: 3,
	id: 'driver2',
	passengers: [{name: 'passX', nickname: null, id:'passX'}]
	},
	// This is a unique column. Handle with care!
	{
		name: 'unassignedPassengers',
		seats: null,
		id: 'unassignedPassengers',
		passengers: [{name: 'pass3', nickname: null, id: 'pass3'}, {name: 'pass4', nickname: null, id: 'pass4'}]
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

