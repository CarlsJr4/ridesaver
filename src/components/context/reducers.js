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