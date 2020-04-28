import React from 'react';
import IconButton from './IconButton';

const Modal = ({children, isEditing, handleVisibility}) => {
	return (
		<div 
			className={isEditing ? 'modal--visible' : 'modal'} 
		>
			<div 
				className="modal__content"
			>
				<div 
					className="modal__close" 
					onClick={() => handleVisibility(false)}
				>
					<IconButton 
						icon="times" 
					/>
				</div>
					{children}
			</div>
		</div>
	);
}

export default Modal;
