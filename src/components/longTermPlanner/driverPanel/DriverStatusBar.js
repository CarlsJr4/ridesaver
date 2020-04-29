import React, { useState, useEffect, useContext, useReducer } from 'react';
import { CarpoolContext } from '../../context/GlobalState';
import { statusReducer } from '../../context/reducers';

const DriverStatusBar = () => {
	const [status, updateStatus] = useReducer(statusReducer, {
		usedSeatCount: 0,
		maxSeats: 0,
		emptyCars: false
	})

	const {driverList, passengerList} = useContext(CarpoolContext);

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
				<strong>{passengerList.length} </strong>
				people need rides
			</li>
			{/* <button>Auto-assign</button> */}
		</ul>
	);
}

export default DriverStatusBar;
