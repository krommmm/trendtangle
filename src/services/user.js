export async function userSign(name, email, password) {
	const preRes = await fetch(
		'https://gobliiins.fr/api/trendtangle/users/signup',
		{
			method: 'POST',
			headers: {},
			body: JSON.stringify({
				name: name,
				email: email,
				password: password,
			}),
		}
	);
	const res = await preRes.json();
	return res;
}

export async function userLog(email, password) {
	const preRes = await fetch(
		'https://gobliiins.fr/api/trendtangle/users/login',
		{
			method: 'POST',
			headers: {},
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		}
	);
	const res = await preRes.json();
	return res;
}



