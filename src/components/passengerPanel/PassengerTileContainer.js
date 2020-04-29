import React from 'react';
import IconButton from '../reusable/IconButton';
import { Draggable } from 'react-beautiful-dnd';

// The passengers prop is either all the unseated passengers or the driver's specific passengers. The type depends on the props.
const PassengerTileContainer = ({handleUpdate, driverIndex, passengers, innerRef, placeholder}) => {

	return (
		<div 
			className="passengerTiles"
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
								{...provided.dragHandleProps}
								ref={provided.innerRef}
								key={passenger.id} 
								id={passenger.id} 
								className="passengerTiles__card"
							>
								<p>
									<span className="grippy"></span>
									{passenger.name}
								</p>
								<IconButton
								handleClick={() => handleUpdate({
									type: 'DELETE_PASSENGER', 
									index: driverIndex, 
									id: passenger.id 
									})} 
								icon="trash" 
								/>
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
