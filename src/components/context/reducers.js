// CRUD Drivers
export function driverReducer(state, action) {
	let drivers = {...state};
	switch (action.type) {
		case 'INIT': {
			const driverList = [...action.drivers];
			// These will hold the values needed for our datastructure 
			let passengerData = []; 
			let passengerRows = {};
			let driverColumns = {};
	
			driverList.forEach(driver => {
				passengerData.push(...driver.passengers)
				driverColumns = {...driverColumns,
					[driver.id]: {
						id: driver.id,
						name: driver.name,
						seats: driver.seats,
						passengerIds: Array.from(driver.passengers, passenger => passenger.id)
					}
				}
			});
	
			passengerData.forEach(passenger => {
				passengerRows = {
					...passengerRows,
					[passenger.id]: {id: passenger.id, name: passenger.name}
				}
			});
	
			const driverData = {
				passengerRows,
				driverColumns,
				columnOrder: Array.from(driverList, driver => driver.id)
			}
			return driverData;
		}

		case 'ADD': {
			// Normally, we would get the ID from mongoDB (perform a POST request, and get the passenger's ID)
			// Currently, ID is being determined by name. We should install UUID later on. 
			let {driverName, driverSeats} = action.formData; // Destructure the form data
			let allDrivers = drivers.driverColumns; // Get the drivers object of the state
			let columnOrder = drivers.columnOrder;
			allDrivers = {
				...allDrivers,
				[driverName]: {
					id: driverName,
					name: driverName,
					passengerIds: [],
					seats: parseInt(driverSeats)
				}
			}
			// We do 2 reassignments because we also need to update the column order
			drivers = {
				...drivers,
				driverColumns: allDrivers,
				columnOrder: [...columnOrder, [driverName]]
			}
			return drivers;
		}

		case 'EDIT': {
			let {driverName, driverSeats} = action.formData; 
			let updatedDriver = drivers.driverColumns[action.driverId];
			// Update driver
			updatedDriver = {
				...updatedDriver,
				name: driverName,
				seats: driverSeats
			}
			// Update state
			drivers.driverColumns = {
				...drivers.driverColumns,
				[action.driverId]: updatedDriver
			}
			return drivers;
		}

		case 'DELETE': 
			drivers.columnOrder = drivers.columnOrder.filter(id => id !== action.driverId);
			delete drivers.driverColumns[action.driverId]
			// We still have the passengers stored in the passengerRows and we could probably reassign them to the passenger pool
			return drivers;

		case 'DELETE_PASSENGER':
			// After deleting, we still have the passengers in the passenger rows
			let driver = drivers.driverColumns[action.driverId];
			let passengers = driver.passengerIds;
			passengers = passengers.filter(item => item !== action.passengerId);
			driver.passengerIds = passengers;
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
			// Handle the case for 0 drivers
			if (drivers.columnOrder.length === 0) {
				return state
			} 

			// Calculate the number of used and max seats
			const reducer = (accumulator, currentValue) => accumulator + currentValue;
			let seatCountArray = [];
			let usedSeatsArray = [];
			drivers.columnOrder.forEach(columnId => {
				let driverData = drivers.driverColumns[columnId];

				usedSeatsArray.push(driverData.passengerIds.length); // Occupied seat count of each driver
				seatCountArray.push(parseInt(driverData.seats)); // Max seat count of each driver
			})

			// Determine if empty cars exist using the usedSeatsArray before reducing it
			let emptyCars = false;
			for (const element of usedSeatsArray) {
				if (element === 0) {
					emptyCars = true;
					break
				}
			}

			let usedSeatCount = usedSeatsArray.reduce(reducer);
			let maxSeats = seatCountArray.reduce(reducer);

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
// Passengers is a whole new list that ReactDnD can update
export function passengerReducer(state, action) {
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