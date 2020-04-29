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
		// This is all the math needed to generate the statistics bar
		// Is there any way we can shorten it?
		case 'UPDATE':
			const reducer = (accumulator, currentValue) => accumulator + currentValue;
			let usedSeats = [];
			let maxSeats = [];
			let usedSeatCount = 0;
			let emptyCars = true;
			drivers.forEach(driver => {
				usedSeats.push(...driver.passengers)
				maxSeats.push(driver.seats)
			});
	
			maxSeats = maxSeats.reduce(reducer);
			usedSeatCount = usedSeats.length;

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