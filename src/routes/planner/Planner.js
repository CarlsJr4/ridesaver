import React, { useContext } from 'react';
import DriverContainer from './driverPanel/DriverContainer';
import UnassignedContainer from './passengerPanel/UnassignedContainer';
import { DragDropContext } from 'react-beautiful-dnd';
import { CarpoolContext } from '../../context/GlobalState';
import transfers from '../../helpers/transfers';
// import IconButton from '../reusable/IconButton';
// import Navbar from '../reusable/Navbar';

// TODO:
// Clean up the code and organization

const Planner = () => {
  const { driverList, updateDriverList } = useContext(CarpoolContext);

  const onDragEnd = result => {
    const { source, destination, draggableId } = result;
    const start = source.droppableId;
    const end = destination.droppableId;
    const sourceIndex = source.index;
    const destIndex = destination.index;

    // Outside drops
    if (!destination) {
      return;
    }

    // Drop in same place
    if (start === end && destIndex === sourceIndex) {
      return;
    }

    // Drop in a different list
    if (start !== end) {
      const updatedState = transfers(
        start,
        end,
        draggableId,
        sourceIndex,
        destIndex,
        driverList
      );
      // Call conversion function here
      // Call API request here with object to send
      updateDriverList({
        type: 'TRANSFER',
        state: updatedState,
      });
      return;
    }

    updateDriverList({
      type: 'REORDER_PASSENGERS',
      source,
      destination,
      draggableId,
    });
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="longTermPlanner">
        <p>
          Ice Skating With Friends | February 12th, 2020 | 6:00pm{' '}
          {/* <span><IconButton icon="user-edit"/></span> */}
        </p>
        <div className="longTermPlanner__cards">
          <DragDropContext onDragEnd={onDragEnd}>
            <DriverContainer />
            <UnassignedContainer />
          </DragDropContext>
        </div>
      </div>
    </>
  );
};

export default Planner;
