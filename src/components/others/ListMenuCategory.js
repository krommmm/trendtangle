import { NavLink } from 'react-router-dom';

const ListMenuCategory = () => {
	return (
		<>
			<div className="listMenu">
				<ul>
					<li>
						<NavLink to="/category?category=pull">pull</NavLink>
					</li>
					<li>
						<NavLink to="/category?category=pantalon">
							pantalon
						</NavLink>
					</li>
					<li>
						<NavLink to="/category?category=t-shirt">
							t-shirt
						</NavLink>
					</li>
					<li>
						<NavLink to="/category?category=chaussure">
							shoes
						</NavLink>
					</li>
				</ul>
			</div>
		</>
	);
};
export default ListMenuCategory;
