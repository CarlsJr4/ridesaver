// Add and delete passengers
// Passengers is a whole new list that ReactDnD can update
export default function passengerReducer(state, action) {
	let passengers = {...state}
	let column = passengers.passengerColumns["passengerColumn"];
	switch (action.type) {
		case 'INIT': {
			const passengerList = [...action.passengers];

			let passengerRows = {};
			let passengerIds = [];

			passengerList.forEach(passenger => {
				passengerRows = {
					...passengerRows,
					[passenger.id]: {id: passenger.id, name: passenger.name}
				}

				passengerIds.push(passenger.id);
			});

			// Transform the JSON into something React beautiful DnD can easily parse
			const passengerData = {
				passengerRows,
				passengerColumns: {
					'passengerColumn': {
						id: 'passengerColumn',
						passengerIds
					}
				},
				columnOrder: ['passengerColumn']
			}
			return passengerData;
		}

		case 'ADD': {
			const { passengerName } = action.formData;
			column.passengerIds.push(passengerName);

			passengers.passengerRows = {
				...passengers.passengerRows,
				[passengerName]: {id: passengerName, name: passengerName}
			}
			return passengers
		}

		case 'DELETE_PASSENGER': {
			let passengerList = column.passengerIds;
			passengerList = passengerList.filter(item => item !== action.passengerId);
			column.passengerIds = passengerList;
			delete passengers.passengerRows[action.passengerId];
			return passengers;
		}
		default:
			throw new Error();
	}
}