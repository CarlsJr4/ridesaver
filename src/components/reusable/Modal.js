import React from 'react';
import IconButton from './IconButton';

const Modal = ({children}) => {
	return (
		<div className="modal">
			<div className="modal__content">
				<div className="modal__close">
					<IconButton icon="times" />
				</div>
				<h1>This is just a test</h1>
				<p>This is also just a test</p>
				{children}
			</div>
		</div>
	);
}

export default Modal;
