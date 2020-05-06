import React from 'react';
import IconButton from './IconButton';

const Modal = ({children, isVisible, handleVisibility}) => {
	return (
		<div 
			className={isVisible ? 'modal--visible' : 'modal'} 
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
