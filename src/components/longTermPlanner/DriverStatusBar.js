import React, {useState, useEffect} from 'react';

const DriverStatusBar = ({driverList, passengerList}) => {
	const [seatStatus, updateSeatStatus] = useState({});

	useEffect(() => {
		updateSeatStatus(calcSeats(driverList));
	}, []);

	// Should we move this to a util folder?
	const calcSeats = (drivers) => {
		const reducer = (accumulator, currentValue) => accumulator + currentValue;
		let usedSeats = [];
		let maxSeats = [];
		let usedSeatCount = 0;
		let emptyCars = true;
		
		drivers.forEach(driver => {
			usedSeats.push(...driver.passengers)
			maxSeats.push(driver.seats)

			if (driver.passengers.length === 0) {
				emptyCars = true;
			} else {
				emptyCars = false;
			}
		});

		maxSeats = maxSeats.reduce(reducer);
		usedSeatCount = usedSeats.length;

		return {
			usedSeatCount,
			maxSeats,
			emptyCars
		}
	}

	return (
		<ul className="drivers__statusBar">
			<li>
				<strong>{seatStatus.usedSeatCount}/{seatStatus.maxSeats} </strong>
				seats used
			</li>
			<li>
				{seatStatus.emptyCars ? 'There are empty cars' : 'No empty cars'}
			</li>
			<li>
				<strong>{passengerList.length} </strong>
				people need rides
			</li>
			<button>Auto-assign</button>
		</ul>
	);
}

export default DriverStatusBar;
