import React, { useEffect, useContext, useReducer } from 'react';
import { CarpoolContext } from '../../../context/GlobalState';
import statusReducer from '../../../context/reducers/statusReducer';

const DriverStatusBar = () => {
	// State is maintained here because it only needs to be used by this component
	const [status, updateStatus] = useReducer(statusReducer, {
		usedSeatCount: 0,
		maxSeats: 0,
		emptyCars: false,
		unassignedPassengers: 0
	})

	const {driverList} = useContext(CarpoolContext);

	useEffect(() => updateStatus({type: 'UPDATE', drivers: driverList}), [driverList]);

	return (
		<ul className="drivers__statusBar">
			<li>
				<strong>{status.usedSeatCount}/{status.maxSeats} </strong>
				seats used
			</li>
			<li>
				{status.emptyCars ? 'There are empty cars' : 'No empty cars'}
			</li>
			<li>
				<strong>{status.unassignedPassengers} </strong>
				people need rides
			</li>
			{/* <button>Auto-assign</button> */}
		</ul>
	);
}

export default DriverStatusBar;
