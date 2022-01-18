export const isEmpty = (obj) => {
	if (obj instanceof Map || obj instanceof Set) {
		return !obj.size;
	}
	return (
		[Object, Array].includes((obj || {}).constructor)
		&& !Object.entries((obj || {})).length
	);
};
