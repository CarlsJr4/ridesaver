export function driverReducer(state, action) {
	let drivers = [...state];
	switch (action.type) {
		case 'ADD':
			drivers.push({
				name: action.formData.driverName,
				seats: parseInt(action.formData.driverSeats),
				id: state.length + 1,
				passengers: []
			});
			return drivers

		case 'DELETE':
			let passengers = drivers[action.index].passengers; 
			passengers = passengers.filter(item => item.id !== action.id)
			drivers[action.index] = {...drivers[action.index], passengers}
			return drivers
		default:
			throw new Error();
	}
}

export function statusReducer(state, action) {
	const drivers = action.drivers;
	switch(action.type) {
		case 'UPDATE':			
			let passengerList = []
			drivers.forEach(driver => passengerList.push(...driver.passengers))
			let usedSeatCount = passengerList.length;
			let maxSeats = Array.from(drivers, driver => driver.seats);
			let emptyCars = null;

			const reducer = (accumulator, currentValue) => accumulator + currentValue;
			maxSeats = maxSeats.reduce(reducer);

			// Loop through the drivers array, stop when you find an empty car
			for (let i = 0; i < drivers.length; i++) {
				if (drivers[i].passengers.length === 0) {
					emptyCars = true;
					break;
				} else {
					emptyCars = false;
				}
			}

			return {
				usedSeatCount,
				maxSeats,
				emptyCars
			}

		default:
			throw new Error();
	}
}

export function passengerReducer(state, action) {
	let passengers = [...state];
	switch (action.type) {
		case 'ADD':
			passengers.push({
				name: action.formData.passengerName,
				id: state.length + 1
			})
			return passengers

		case 'DELETE':
			passengers = passengers.filter(item => item.id !== action.id)
			return passengers
		default:
			throw new Error();
	}
}