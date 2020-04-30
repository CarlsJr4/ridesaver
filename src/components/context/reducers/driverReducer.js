export default function driverReducer(state, action) {
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