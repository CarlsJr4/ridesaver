// The point of this function is to reuse the splicing logic so that it is easier to send things to the RESTful API

export default function transfers(
  startId,
  destId,
  passengerId,
  sourceIndex,
  destIndex,
  driverList
) {
  const state = { ...driverList };

  const sourceColumn = state.driverColumns[startId];
  const endColumn = state.driverColumns[destId];

  if (
    !endColumn.isPassengerPool &&
    endColumn.passengerIds.length === endColumn.seats
  ) {
    alert('This car is full!');
    return state;
  }

  sourceColumn.passengerIds.splice(sourceIndex, 1);
  endColumn.passengerIds.splice(destIndex, 0, passengerId);

  console.log(state);

  return state;
}
