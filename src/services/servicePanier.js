export async function getPanier(token) {
	const preRes = await fetch(
		'https://gobliiins.fr/api/trendtangle/baskets',
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

export async function addToPanier(token, uuid) {
	const preRes = await fetch(
		`https://gobliiins.fr/api/trendtangle/baskets/add`,
		{
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				articlesId: uuid,
			}),
		}
	);
	const res = await preRes.json();
	return res;
}

export async function modifyBasket(token,articleId,quantity) {
	const preRes = await fetch(
		`https://gobliiins.fr/api/trendtangle/baskets/${articleId}/modify`,
		{
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				quantity: quantity,
			}),
		}
	);
	const res = await preRes.json();
	return res;
}



export async function deleteArticleFromPanier(token, uuid) {
	const preRes = await fetch(
		`http://localhost/api/trendtangle/baskets/${uuid}/delete`,
		{
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
	const res = await preRes.json();
	return res;
}
