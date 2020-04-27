import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const IconButton = ({handleClick, icon}) => {
	return (
		<button className="iconButton" onClick={handleClick}>
			<FontAwesomeIcon icon={icon} />
		</button>
	);
}

export default IconButton;
