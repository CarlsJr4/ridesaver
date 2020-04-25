import React from 'react';

const Navbar = () => {
	return (
		<nav>
			<ul>
				<li>Home</li>
				<li>My Events</li>
				<li>Profile</li>
				<li id="nav__logout">Logout</li>
			</ul>
		</nav>
	);
}

export default Navbar;
