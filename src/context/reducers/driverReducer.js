import { v4 as uuidv4 } from 'uuid';

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
						nickname: driver.nickname,
						seats: driver.seats,
						passengerIds: Array.from(driver.passengers, passenger => passenger.id)
					}
				}
			});
	
			passengerData.forEach(passenger => {
				passengerRows = {
					...passengerRows,
					[passenger.id]: {id: passenger.id, name: passenger.name, nickname: passenger.nickname}
				}
			});
	
			const columnOrder = Array.from(driverList, driver => driver.id);
			columnOrder.pop(); // So the column of passengers is not included in the driverList

			const driverData = {
				passengerRows,
				driverColumns,
				columnOrder
			}
			return driverData;
		}

		case 'ADD_PASSENGER': {
			const id = uuidv4();
			const unassignedPassengers = drivers.driverColumns.unassignedPassengers;

			const newPassenger = {
				id,
				name: action.name,
				nickname: action.nickname
			}
			// Add to passenger pool
			drivers.passengerRows = {
				...drivers.passengerRows, 
				[id]: newPassenger
			}
			// Append to passenger column IDs
			unassignedPassengers.passengerIds.push(id);
			return drivers
		}

		case 'ADD_DRIVER': {
			// Normally, we would get the ID from mongoDB (perform a POST request, and get the driver's ID, then assign it to the new driver)
			let {driverName, driverNickname, driverSeats} = action.formData; // Destructure the form data
			let allDrivers = drivers.driverColumns; // Get the drivers object of the state
			let columnOrder = drivers.columnOrder;
			let id = uuidv4();
			allDrivers = {
				...allDrivers,
				[id]: {
					id,
					name: driverName,
					nickname: driverNickname,
					passengerIds: [],
					seats: parseInt(driverSeats)
				}
			}
			// We do 2 reassignments because we also need to update the column order
			drivers = {
				...drivers,
				driverColumns: allDrivers,
				columnOrder: [...columnOrder, id]
			}
			return drivers;
		}

		case 'EDIT': {
			let {driverName, driverNickname, driverSeats} = action.formData; 
			let updatedDriver = drivers.driverColumns[action.driverId];
			// Update driver
			updatedDriver = {
				...updatedDriver,
				name: driverName,
				nickname: driverNickname,
				seats: parseInt(driverSeats)
			}
			// Update state
			drivers.driverColumns = {
				...drivers.driverColumns,
				[action.driverId]: updatedDriver
			}
			return drivers;
		}

		case 'DELETE': {
			drivers.columnOrder = drivers.columnOrder.filter(id => id !== action.driverId);
			delete drivers.driverColumns[action.driverId]
			// We still have the passengers stored in the passengerRows and we could probably reassign them to the passenger pool
			return drivers;
		}

		case 'DELETE_PASSENGER': {
			const {passengerId, driverId} = action;

			let driver = drivers.driverColumns[driverId]; 
			let passengers = driver.passengerIds;
			passengers = passengers.filter(item => item !== passengerId);
			driver.passengerIds = passengers;

			// Return passenger to list if they came from a driver
			if (driver.id !== "unassignedPassengers") {
				const unassignedColumn = drivers.driverColumns.unassignedPassengers;
				const passengerPool = unassignedColumn.passengerIds;
				passengerPool.push(passengerId);
			}

			// Permanent passenger delete if the source is the unassigned passengers column
			if (driver.id === "unassignedPassengers") {
				const passengerRows = drivers.passengerRows;
				delete passengerRows[passengerId];
			}
			
			return drivers;
		}

		case 'REORDER_PASSENGERS': {
			let column = drivers.driverColumns[action.source.droppableId];
			const newPassengerIds = column.passengerIds;
			newPassengerIds.splice(action.source.index, 1);
			newPassengerIds.splice(action.destination.index, 0, action.draggableId);

			return drivers;
		}

		case 'TRANSFER': {
			const {source, destination, draggableId} = action;

			const sourceColumn = drivers.driverColumns[source.droppableId];
			const endColumn = drivers.driverColumns[destination.droppableId];

			if (destination.droppableId !== "unassignedPassengers" &&
					endColumn.passengerIds.length === endColumn.seats
			) {
				alert('This car is full!');
				return drivers;
			}
			
			sourceColumn.passengerIds.splice(source.index, 1);
			endColumn.passengerIds.splice(destination.index, 0, draggableId);

			return drivers;
		}

		default:
			throw new Error();
	}
}