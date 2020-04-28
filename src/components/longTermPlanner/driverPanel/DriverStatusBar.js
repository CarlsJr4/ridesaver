import React, {useState, useEffect, useContext} from 'react';
import { CarpoolContext } from '../../context/GlobalState';

const DriverStatusBar = () => {
	const [seatStatus, updateSeatStatus] = useState({});
	const [emptyCars, setEmptyCars] = useState(true);

	const {driverList, passengerList} = useContext(CarpoolContext);

	useEffect(() => {
		updateSeatStatus(calcSeats(driverList));

		for (let i = 0; i < driverList.length; i++) {
			if (driverList[i].passengers.length === 0) {
				setEmptyCars(true);
				break;
			} else {
				setEmptyCars(false);
			}
		}
	}, [driverList]);

	// Should we move this to a util folder?
	// If we want to make this function reusable, we need to make it more generic
	const calcSeats = (drivers) => {
		const reducer = (accumulator, currentValue) => accumulator + currentValue;
		let usedSeats = [];
		let maxSeats = [];
		let usedSeatCount = 0;
		
		drivers.forEach(driver => {
			usedSeats.push(...driver.passengers)
			maxSeats.push(driver.seats)
		});

		maxSeats = maxSeats.reduce(reducer);
		usedSeatCount = usedSeats.length;

		return {
			usedSeatCount,
			maxSeats,
		}
	}

	return (
		<ul className="drivers__statusBar">
			<li>
				<strong>{seatStatus.usedSeatCount}/{seatStatus.maxSeats} </strong>
				seats used
			</li>
			<li>
				{emptyCars ? 'There are empty cars' : 'No empty cars'}
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
