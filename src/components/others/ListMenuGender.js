import { NavLink } from 'react-router-dom';

const ListMenuCategory = () => {
	return (
		<>
			<div className="listMenu">
				<ul>
					<li>
						<NavLink to="/Gender?category=femme">Female</NavLink>
					</li>
					<li>
						<NavLink to="/Gender?category=homme">Male</NavLink>
					</li>
					<li>
						<NavLink to="/Gender?category=enfant">Child</NavLink>
					</li>
				</ul>
			</div>
		</>
	);
};
export default ListMenuCategory;
