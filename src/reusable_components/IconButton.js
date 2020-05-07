import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const IconButton = ({handleClick, icon}) => {
	return (
		<button 
			className="iconButton"
			onClick={handleClick}
		>
			<FontAwesomeIcon 
				icon={icon} 
			/>
		</button>
	);
}

IconButton.propTypes = {
	handleClick: PropTypes.func,
	icon: PropTypes.string.isRequired
}

export default IconButton;
