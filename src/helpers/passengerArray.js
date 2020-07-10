// The point of this function is to take passenger IDs, create an array of objects, and send it to the RESTful API

export default function passengerArray(sourceId, destId, state) {
  const driverState = { ...state };

  const sourceColumn = driverState.driverColumns[sourceId];
  const destColumn = driverState.driverColumns[destId];
  const passengerRows = driverState.passengerRows;
  const sourcePassengers = [];
  const destPassengers = [];

  sourceColumn.passengerIds.forEach(id => {
    const passenger = passengerRows[id];
    sourcePassengers.push({
      _id: passenger.id,
      name: passenger.name,
      nickname: passenger.nickname,
    });
  });

  destColumn.passengerIds.forEach(id => {
    const passenger = passengerRows[id];
    destPassengers.push({
      _id: passenger.id,
      name: passenger.name,
      nickname: passenger.nickname,
    });
  });

  const passengerData = { sourcePassengers, destPassengers };
  return passengerData;
}
