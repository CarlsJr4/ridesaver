import React from 'react';

const DriverStatusBar = () => {
	return (
		<ul className="drivers__statusBar">
			<li><strong>12/12</strong> seats used</li>
			<li>No empty cars</li>
			<li><strong>5</strong> people need rides</li>
			<button>Auto-assign</button>
		</ul>
	);
}

export default DriverStatusBar;
