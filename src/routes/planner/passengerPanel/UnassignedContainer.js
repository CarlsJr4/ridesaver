import React, { useContext, useState } from 'react';
import PassengerContainer from '../PassengerContainer';
import { CarpoolContext } from '../../../context/GlobalState';
import { Droppable } from 'react-beautiful-dnd';
import IconButton from '../../../reusable_components/IconButton';
import AddPassengerModal from './AddPassengerModal';

const Passengers = () => {
  const { updateDriverList, driverList } = useContext(CarpoolContext);
  const [isAddingPassenger, toggleAddPassenger] = useState(false);
  const drivers = driverList.driverColumns;

  let passengerPoolId;

  for (const driverId in drivers) {
    if (drivers[driverId].isPassengerPool) {
      passengerPoolId = driverId;
    }
  }

  const passengerIds = driverList.driverColumns[passengerPoolId].passengerIds;

  const passengerData = passengerIds.map(id => driverList.passengerRows[id]);
  const columnId = passengerPoolId;

  return (
    <div className="passengersContainer">
      <AddPassengerModal
        isVisible={isAddingPassenger}
        handleVisibility={toggleAddPassenger}
      />
      <div className="passengersContainer__header">
        <h3>Unassigned Riders</h3>
        <IconButton icon="plus" handleClick={() => toggleAddPassenger(true)} />
      </div>
      <Droppable droppableId={columnId}>
        {(provided, snapshot) => (
          <PassengerContainer
            {...provided.droppableProps}
            innerRef={provided.innerRef}
            handleUpdate={updateDriverList}
            passengers={passengerData}
            placeholder={provided.placeholder}
            driverId={columnId}
            isDraggingOver={snapshot.isDraggingOver}
          />
        )}
      </Droppable>
    </div>
  );
};

export default Passengers;
