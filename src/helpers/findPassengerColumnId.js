export default function findPassengerColumnId(driverList) {
  let passengerPoolId;

  for (const driverId in driverList) {
    if (driverList[driverId].isPassengerPool) {
      passengerPoolId = driverId;
    }
  }

  return passengerPoolId;
}
