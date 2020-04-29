// CRUD Drivers
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
			return drivers;

		case 'EDIT':
			drivers[action.index] = {
				...drivers[action.index],
				name: action.formData.driverName,
				seats: parseInt(action.formData.driverSeats)
			}
			return drivers;

		case 'DELETE': 
			drivers = drivers.filter(driver => driver.id !== action.id);
			return drivers;

		case 'DELETE_PASSENGER':
			let passengers = drivers[action.index].passengers; 
			passengers = passengers.filter(item => item.id !== action.id)
			drivers[action.index] = {...drivers[action.index], passengers}
			return drivers;
		default:
			throw new Error();
	}
}

// Status bar updates
export function statusReducer(state, action) {
	const drivers = action.drivers;
	switch(action.type) {
		case 'UPDATE':	
			let passengerList = [];
			drivers.forEach(driver => passengerList.push(...driver.passengers));
			let usedSeatCount = passengerList.length;
			let maxSeats = Array.from(drivers, driver => driver.seats);
			let emptyCars = null;

			const reducer = (accumulator, currentValue) => accumulator + currentValue;
			if (maxSeats.length > 0) {
				maxSeats = maxSeats.reduce(reducer);
			} else {
				maxSeats = [0]
			}

			for (let i = 0; i < drivers.length; i++) {
				if (drivers[i].passengers.length === 0) {
					emptyCars = true;
					break; // so that this value doesn't get reassigned if nonempty cars exist 
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

// Add and delete passengers
export function passengerReducer(state, action) {
	let passengers = [...state];
	switch (action.type) {
		case 'ADD':
			passengers.push({
				name: action.formData.passengerName,
				id: state.length + 1
			})
			return passengers

		case 'DELETE_PASSENGER':
			passengers = passengers.filter(item => item.id !== action.id)
			return passengers
		default:
			throw new Error();
	}
}