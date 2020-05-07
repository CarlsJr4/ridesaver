import React from 'react';
import IconButton from '../../reusable_components/IconButton';
import { Draggable } from 'react-beautiful-dnd';

// NOTE: This component is shared beteen the DriverContainer and UnassignedContainer components
const PassengerTileContainer = ({isDraggingOver, handleUpdate, driverId, passengers, innerRef, placeholder}) => {

	return (
		<div 
			className={isDraggingOver ? "passengerTiles--isDraggingOver" : "passengerTiles"}
			ref={innerRef}
		>
				{passengers.map((passenger, i) =>
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
								<p>
									{passenger.name}
								</p>
								<IconButton
								handleClick={() => handleUpdate({
									type: 'DELETE_PASSENGER', 
									driverId: driverId, 
									passengerId: passenger.id
									})} 
								icon="trash" 
								/>
								{passenger.nickname &&
									<p>
										{passenger.nickname}
									</p>
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
