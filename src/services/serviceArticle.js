export async function postArticle(token, formData) {
	const preRes = await fetch(
		'https://gobliiins.fr/api/trendtangle/articles',
		{
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: formData,
		}
	);

	const res = await preRes.json();
	return res;
}

export async function deleteArticle(token, uuid) {
	const preRes = await fetch(
		`https://gobliiins.fr/api/trendtangle/articles/${uuid}`,
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

export async function likeArticle(token, uuid) {
	const preRes = await fetch(
		`https://gobliiins.fr/api/trendtangle/articles/${uuid}/likes`,
		{
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				likes: 'likes',
			}),
		}
	);
	const res = await preRes.json();
	console.log(res);
}

export async function updateArticle(token,uuid,formData){
	const preRes = await fetch(
		`https://gobliiins.fr/api/trendtangle/articles/${uuid}`,
		{
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: formData,
		}
	);
	const res = await preRes.json();
	return res;
}


