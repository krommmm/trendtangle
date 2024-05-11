import React, { useState, useEffect } from 'react';
import { isAdmin } from '../../services/isAdmin';
import getArticles from '../../services/getArticles';
import Articles from '../utils/Articles';

function Admin() {
	const [isAdministrator, setIsAdministrator] = useState(false);
	const [articles, setArticles] = useState([]);
	const [toggle, setToggle] = useState(false);

	useEffect(() => {
		const token = JSON.parse(localStorage.getItem('token'));
		if (token !== null && token !== undefined && token !== 'undefined') {
			checkIfIsAdmin(token);
		} else {
			localStorage.removeItem('token');
		}
	}, []);

	useEffect(() => {
		getArticles()
			.then((res) => {
				setArticles(res.articles);
			})
			.catch((err) => console.error(err));
	}, [toggle]); 

	async function checkIfIsAdmin(token) {
		const res = await isAdmin(token);
		if (res.msg === 'success') {
			setIsAdministrator(true);
		} else {
			setIsAdministrator(false);
		}
	}

	return (
		<>
			<div className="admin">
				<p className="bigTitle">Admin</p>
				<div className="admin__articles">
					<Articles data={articles} isAdmin={isAdministrator} refresh={setToggle} stateRefresh={toggle} />
				</div>
			</div>
		</>
	);
}

export default Admin;
