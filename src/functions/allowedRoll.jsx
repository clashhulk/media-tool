const allowedRoll = (...allowedRoles) => {
	let Suser = JSON.parse(localStorage.getItem('userIn'));
	function isPositive(value) {
		return value === Suser.user.roles[0].id;
	}
	let filtered = allowedRoles.filter(isPositive);
	return filtered.length > 0 ? false : true;
};

export default allowedRoll;
