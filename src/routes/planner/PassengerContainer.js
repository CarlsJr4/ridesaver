import React from 'react';
import IconButton from '../../reusable_components/IconButton';
import { Draggable } from 'react-beautiful-dnd';
import useBlurEdit from '../../custom_hooks/useBlurEdit';

// NOTE: This component is shared beteen the DriverContainer and UnassignedContainer components
const PassengerTileContainer = ({isDraggingOver, handleUpdate, driverId, passengers, innerRef, placeholder}) => {
	const { handleBlurEdit, handleKeyEdit } = useBlurEdit();

	return (
		<div 
			className={isDraggingOver ? "passengerTiles--isDraggingOver" : "passengerTiles"}
			ref={innerRef}
		>
				{passengers.map((passenger, i) =>
					// Each of these draggables is an individual passenger tile
					<Draggable
						draggableId={passenger.id.toString()}
						index={i}
						key={passenger.id}
					>
						{(provided) => (
							<div 
								{...provided.draggableProps}
								ref={provided.innerRef}
								key={passenger.id} 
								id={passenger.id} 
								className="passengerTiles__card"
							>
							<div {...provided.dragHandleProps}>
								<span
									className="grippy"
									/>
							</div>
								<textarea
									rows="1"
									defaultValue={passenger.name}
									spellCheck={false}
									maxLength="20"
									name="name"
									onBlur={(e) => handleBlurEdit(e, passenger.name, 'EDIT_PASSENGER', driverId, passenger.id )} // Need columnID, itemID
									onKeyDown={handleKeyEdit}
								/>
								<IconButton
								handleClick={() => handleUpdate({
									type: 'DELETE_PASSENGER', 
									driverId: driverId, 
									passengerId: passenger.id
									})} 
								icon="trash" 
								/>
								{passenger.nickname &&
									<textarea
										rows="1"
										defaultValue={passenger.nickname}
										spellCheck={false}
										maxLength="20"
										name="nickname"
										onBlur={(e) => handleBlurEdit(e, passenger.nickname, 'EDIT_PASSENGER', driverId, passenger.id)}
										onKeyDown={handleKeyEdit}
									/>
								}
							</div> 
						)}
					</Draggable>
					)
				}
				{placeholder}
			</div>
	);
}

export default PassengerTileContainer;
