import findPassengerColumnId from '../../helpers/findPassengerColumnId';

// How can we reduce the size of this file?

export default function driverReducer(state, action) {
  let drivers = { ...state }; // The global state of the app
  const passengerColumnId = findPassengerColumnId(drivers.driverColumns);
  const passengerColumn = drivers.driverColumns[passengerColumnId];
  switch (action.type) {
    case 'INIT': {
      const driverList = [...action.drivers]; // Retrieved list of drivers
      // These will hold the values needed for our datastructure
      let passengerData = [];
      let passengerRows = {};
      let driverColumns = {};

      // Map each retrieved driver to a new object
      driverList.forEach(driver => {
        passengerData.push(...driver.passengers);
        driverColumns = {
          ...driverColumns,
          [driver._id]: {
            id: driver._id,
            isPassengerPool: driver.isPassengerPool || false, // Special property to determine passenger column
            name: driver.name,
            nickname: driver.nickname,
            seats: driver.seats,
            passengerIds: Array.from(
              driver.passengers,
              passenger => passenger._id
            ),
          },
        };
      });

      // Extract all passenger IDs
      passengerData.forEach(passenger => {
        passengerRows = {
          ...passengerRows,
          [passenger._id]: {
            id: passenger._id,
            name: passenger.name,
            nickname: passenger.nickname,
          },
        };
      });

      const columnOrder = Array.from(driverList, driver => driver._id);
      columnOrder.splice(0, 1); // To remove the column of passengers

      const driverData = {
        passengerRows,
        driverColumns,
        columnOrder,
      };

      return driverData;
    }

    case 'ADD_PASSENGER': {
      const id = action.passengerId;
      const newPassenger = {
        id,
        name: action.name,
        nickname: action.nickname || null,
      };

      // Add to combined passenger pool
      drivers.passengerRows = {
        ...drivers.passengerRows,
        [id]: newPassenger,
      };

      // Add to a specific passenger column
      if (!action.driverId) {
        passengerColumn.passengerIds.push(id);
      } else {
        const driver = drivers.driverColumns[action.driverId];
        driver.passengerIds.push(id);
      }

      return drivers;
    }

    case 'ADD_DRIVER': {
      let { driverName, driverNickname, driverSeats } = action.formData; // Destructure the form data
      let id = action.driverId;
      let allDrivers = drivers.driverColumns; // Get the drivers object of the state
      let columnOrder = drivers.columnOrder;
      allDrivers = {
        ...allDrivers,
        [id]: {
          id,
          name: driverName,
          nickname: driverNickname,
          passengerIds: [],
          seats: parseInt(driverSeats),
        },
      };
      // We do 2 reassignments because we also need to update the column order
      drivers = {
        ...drivers,
        driverColumns: allDrivers,
        columnOrder: [...columnOrder, id],
      };
      return drivers;
    }

    case 'EDIT_DRIVER_SEATS': {
      let { driverSeats } = action.formData;
      let updatedDriver = drivers.driverColumns[action.driverId];

      updatedDriver = {
        ...updatedDriver,
        seats: parseInt(driverSeats),
      };

      drivers.driverColumns = {
        ...drivers.driverColumns,
        [action.driverId]: updatedDriver,
      };
      return drivers;
    }

    case 'EDIT_DRIVER_NAME': {
      let driver = drivers.driverColumns[action.itemId];
      driver = {
        ...driver,
        [action.fieldName]: action.value || null,
      };
      drivers.driverColumns = {
        ...drivers.driverColumns,
        [action.itemId]: driver,
      };
      return drivers;
    }

    case 'EDIT_PASSENGER': {
      let passenger = drivers.passengerRows[action.itemId];
      passenger = {
        ...passenger,
        [action.fieldName]: action.value || null,
      };
      drivers.passengerRows = {
        ...drivers.passengerRows,
        [action.itemId]: passenger,
      };
      return drivers;
    }

    case 'DELETE_DRIVER': {
      drivers.columnOrder = drivers.columnOrder.filter(
        id => id !== action.driverId
      );
      delete drivers.driverColumns[action.driverId];
      // We still have the passengers stored in the passengerRows and we could probably reassign them to the passenger pool
      return drivers;
    }

    case 'DELETE_PASSENGER': {
      const { passengerId, driverId } = action;

      let driver = drivers.driverColumns[driverId];
      let passengers = driver.passengerIds;
      passengers = passengers.filter(item => item !== passengerId);
      driver.passengerIds = passengers;

      if (!driver.isPassengerPool) {
        const passengerPool = passengerColumn.passengerIds;
        passengerPool.push(passengerId);
      } else {
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
      return action.state;
    }

    default:
      throw new Error();
  }
}
