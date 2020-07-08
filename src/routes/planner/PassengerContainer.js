import React from 'react';
import IconButton from '../../reusable_components/IconButton';
import { Draggable } from 'react-beautiful-dnd';
import useBlurEdit from '../../custom_hooks/useBlurEdit';
import axios from 'axios';

// NOTE: This component is shared beteen the DriverContainer and UnassignedContainer components
const PassengerTileContainer = ({
  isDraggingOver,
  handleUpdate,
  driverId,
  passengers,
  innerRef,
  placeholder,
}) => {
  const { handleBlurEdit, handleKeyEdit } = useBlurEdit();

  return (
    <div
      className={
        isDraggingOver ? 'passengerTiles--isDraggingOver' : 'passengerTiles'
      }
      ref={innerRef}
    >
      {passengers.map((passenger, i) => (
        // Each of these draggables is an individual passenger tile
        <Draggable
          draggableId={passenger.id.toString()}
          index={i}
          key={passenger.id}
        >
          {provided => (
            <div
              {...provided.draggableProps}
              ref={provided.innerRef}
              key={passenger.id}
              id={passenger.id}
              className="passengerTiles__card"
            >
              <div {...provided.dragHandleProps}>
                <span className="grippy" />
              </div>
              <textarea
                rows="1"
                defaultValue={passenger.name}
                spellCheck={false}
                maxLength="20"
                name="name"
                onBlur={e =>
                  handleBlurEdit(
                    e,
                    passenger.name,
                    'EDIT_PASSENGER',
                    driverId,
                    passenger.id
                  )
                } // Need columnID, itemID
                onKeyDown={handleKeyEdit}
              />
              <IconButton
                handleClick={async () => {
                  // Do a transfer API call if deleting from driver
                  axios.delete(
                    `http://localhost:3000/api/events/5ef538186635ff06cc86258b/drivers/${driverId}/passengers/${passenger.id}`
                  );
                  return handleUpdate({
                    type: 'DELETE_PASSENGER',
                    driverId: driverId,
                    passengerId: passenger.id,
                  });
                }}
                icon="trash"
              />
              <textarea
                rows="1"
                defaultValue={passenger.nickname}
                spellCheck={false}
                maxLength="20"
                name="nickname"
                placeholder="(no nickname)"
                onBlur={e =>
                  handleBlurEdit(
                    e,
                    passenger.nickname,
                    'EDIT_PASSENGER',
                    driverId,
                    passenger.id
                  )
                }
                onKeyDown={handleKeyEdit}
              />
            </div>
          )}
        </Draggable>
      ))}
      {placeholder}
    </div>
  );
};

export default PassengerTileContainer;
