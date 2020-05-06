import React from 'react';
import Modal from '../../../../reusable_components/Modal';

const LinkModal = ({isVisible, handleVisibility}) => {
	return (
		<Modal 
			isVisible={isVisible} 
			handleVisibility={handleVisibility}
		>
			<div className="modalMessage">
				<h1>Sit back and relax.</h1>
				<p>Share this link with your attendees to allow them to sign up on their own!</p>
				<p>No account needed.</p>
				<h3><a href="#">https://thisfeatureisntreadyyet.com/work-in-progress</a></h3>
				<p>They can sign up as a driver or passenger to an existing car.</p>
			</div>
		</Modal>
	);
}

export default LinkModal;
