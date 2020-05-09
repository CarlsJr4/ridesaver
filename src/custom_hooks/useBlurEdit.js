import { useContext } from 'react';
import { CarpoolContext } from '../context/GlobalState';

export default function useBlurEdit() {

	// The title can just be separated from this

	const { updateDriverList } = useContext(CarpoolContext);

	const handleBlurEdit = (e, original, type, columnId, itemId) => {
		// To prevent accidental deletion
		if (e.target.value.length === 0) {
			e.target.value = original;
			return
		}
		updateDriverList({
			type,
			columnId,
			itemId,
			fieldName: e.target.name,
			value: e.target.value
		});
	}

	const handleKeyEdit = (e) => {
		if (e.keyCode === 13) { // keyCode 13 is the enter key
			e.target.blur();
		} 
	}

	return {
		handleBlurEdit,
		handleKeyEdit
	}
}
