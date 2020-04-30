import React, { useReducer, useEffect } from 'react';
import { driverReducer, passengerReducer } from './reducers';

export const CarpoolContext = React.createContext();

const fakeDriverList = [
	{
	name: 'driver1',
	seats: 3,
	id: 'driver1',
	passengers: [{name: 'pass1', id: 'pass1'}, {name: 'pass2', id: 'pass2'}]
	},
	{
	name: 'driver2',
	seats: 3,
	id: 'driver2',
	passengers: [{name: 'passX', id:'passX'}]
	},
];

// TODO: Assign your free passengers
const fakePassengerList = [{name: 'pass3', id: 'pass3'}, {name: 'pass4', id: 'pass4'}];

// Only includes state that is read at multiple levels of the app
const GlobalState = ({children}) => {
	const [driverList, updateDriverList] = useReducer(driverReducer, {
		passengerRows: {},
		driverColumns: {},
		columnOrder: []
	});
	const [passengerList, updatePassengerList] = useReducer(passengerReducer, {
		passengerRows: {},
		passengerColumns: {},
		columnOrder: []
	});

	function fakeApiCall() {
		// API call would go here, then we'd send the data to our reducer to process
		updateDriverList({
			type: 'INIT',
			drivers: fakeDriverList
		})
		updatePassengerList({
			type: 'INIT',
			passengers: fakePassengerList
		})
	}

	useEffect(() => fakeApiCall(), []);

	return (
		<CarpoolContext.Provider 
			value={{
				driverList, 
				passengerList,
				updateDriverList,
				updatePassengerList
			}}
		>
			{children}
		</CarpoolContext.Provider>
	);
}

export default GlobalState;

