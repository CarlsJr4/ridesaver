import React, { useReducer } from 'react';
import { driverReducer, passengerReducer } from './reducers';

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

// Only includes state that is read at multiple levels of the app
const GlobalState = ({children}) => {
	const [driverList, updateDriverList] = useReducer(driverReducer, fakeDriverList);
	const [passengerList, updatePassengerList] = useReducer(passengerReducer, fakePassengerList);

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

