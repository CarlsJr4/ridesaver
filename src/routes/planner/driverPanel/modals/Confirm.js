import React from 'react';

const ConfirmationModal = () => {
	return (
		<Modal 
				isVisible={isVisible} 
				handleVisibility={handleVisibility}
			>
				<h1>Are you sure you want to delete the driver?</h1>
				<button>Yes</button>
				<button>No</button>
			</Modal>
	);
}

export default ConfirmationModal;
