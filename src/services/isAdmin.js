export async function isAdmin(token) {
	const preRes = await fetch(
		'http://localhost/api_multi/api/trendtangle/admin',
		{
			method: 'GET',
			headers: {
                Authorization: `Bearer ${token}`,
            },
		}
	);
	const res = await preRes.json();
	return res;
}