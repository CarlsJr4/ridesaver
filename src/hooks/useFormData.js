const { useState } = require('react');

export default function useFormData() {
	const [formData, setFormData] = useState({});

	function handleInputChange(e) {
		const target = e.target;
		const {name, value} = target;
		setFormData({
			...formData,
			[name]: value
		})
	}

	return {
		formData,
		setFormData,
		handleInputChange
	}
}