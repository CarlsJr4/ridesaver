import React, { useState, useEffect, useContext } from 'react';
import PassengerTileContainer from '../PassengerContainer';
import IconButton from '../../../reusable_components/IconButton';
import { CarpoolContext } from '../../../context/GlobalState';
import { Droppable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import useBlurEdit from '../../../custom_hooks/useBlurEdit';

const DriverCard = ({name, nickname, id, passengers, totalSeats, toggleEditDriver, updateDriverBeingEdited}) => {
	const [seatCapacityBar, updateCapacityBar] = useState(0); // Capacity bar width
	const {updateDriverList} = useContext(CarpoolContext);
	const { handleBlurEdit, handleKeyEdit } = useBlurEdit();

	useEffect(() => updateCapacityBar((passengers.length / totalSeats) * 100), [passengers.length, totalSeats]);

	function callEditModal() {
		toggleEditDriver(true);
		updateDriverBeingEdited({
			totalSeats,
			passengers, // So we can determine if passengers are still in the car
			id
		})
	}

	return (
		<div className="driversCard">
			<div className="driversCard__headerTop">
				{/* Maybe we can turn these textareas into reusable components? */}
				{/* Maybe the custom component can use the custom hook */}
				{/* We can always refactor this later */}
				<textarea
					defaultValue={name}
					name="name"
					rows="1"
					className="driversCard__name"
					spellCheck={false}
					maxLength="20"
					onKeyDown={handleKeyEdit}
					onBlur={(e) => handleBlurEdit(e, name, 'EDIT_DRIVER_NAME', id, id)}
				/>
				<IconButton
					icon="user-edit"
					handleClick={callEditModal}
					/>
				<textarea 
					defaultValue={nickname}
					spellCheck={false}
					name="nickname"
					placeholder="(no nickname)"
					rows="1"
					maxLength="20"
					onKeyDown={handleKeyEdit}
					onBlur={(e) => handleBlurEdit(e, nickname, 'EDIT_DRIVER_NAME', id, id)}
				/>
			</div>
			<div className="driversCard__headerBottom">
				<p>({passengers.length}/{totalSeats})</p>
				<div 
					className={`${seatCapacityBar} ` < 100 ? 'driversCard__percentBar--incomplete' : 'driversCard__percentBar--complete' }
					style={{
						width: `${seatCapacityBar}%`,
					}}>
				</div>
			</div>
			<Droppable
				droppableId={id.toString()}
			>
				{(provided, snapshot) => (
					<PassengerTileContainer
						{...provided.droppableProps}
						innerRef={provided.innerRef}
						passengers={passengers}
						handleUpdate={updateDriverList}
						driverId={id}
						placeholder={provided.placeholder}
						isDraggingOver={snapshot.isDraggingOver}
					>
					</PassengerTileContainer>
				)}
			</Droppable>
		</div>
	);
}

DriverCard.propTypes = {
	name: PropTypes.string.isRequired,
	nickname: PropTypes.string,
	id: PropTypes.string.isRequired,
	passengers: PropTypes.array.isRequired,
	totalSeats: PropTypes.number.isRequired,
	toggleEditDriver: PropTypes.func.isRequired,
	updateDriverBeingEdited: PropTypes.func.isRequired
}

export default DriverCard;
