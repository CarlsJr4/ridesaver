import findPassengerColumnId from '../../helpers/findPassengerColumnId';

export default function statusReducer(state, action) {
  const drivers = action.drivers;
  const passengerColumnId = findPassengerColumnId(drivers.driverColumns);
  const unassignedPassengers =
    drivers.driverColumns[passengerColumnId].passengerIds.length;
  switch (action.type) {
    case 'UPDATE':
      // Handle the case for 0 drivers
      if (drivers.columnOrder.length === 0) {
        return {
          usedSeatCount: 0,
          maxSeats: 0,
          emptyCars: false,
          unassignedPassengers,
        };
      }

      // Calculate the number of used and max seats
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      let seatCountArray = [];
      let usedSeatsArray = [];
      drivers.columnOrder.forEach(columnId => {
        let driverData = drivers.driverColumns[columnId];

        usedSeatsArray.push(driverData.passengerIds.length); // Occupied seat count of each driver
        seatCountArray.push(parseInt(driverData.seats)); // Max seat count of each driver
      });

      // Determine if empty cars exist using the usedSeatsArray before reducing it
      let emptyCars = false;
      for (const element of usedSeatsArray) {
        if (element === 0) {
          emptyCars = true;
          break;
        }
      }

      let usedSeatCount = usedSeatsArray.reduce(reducer);
      let maxSeats = seatCountArray.reduce(reducer);

      return {
        usedSeatCount,
        maxSeats,
        emptyCars,
        unassignedPassengers,
      };

    default:
      throw new Error();
  }
}
