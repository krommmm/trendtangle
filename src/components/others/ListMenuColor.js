import { NavLink } from 'react-router-dom';

const ListMenuColor = () => {
	return (
		<>
			<div className="listMenu">
				<ul>
					<li>
						<NavLink to="/Color?category=bleu">Blue</NavLink>
					</li>
					<li>
						<NavLink to="/Color?category=blanc">
							White
						</NavLink>
					</li>
					<li>
						<NavLink to="/Color?category=rouge">
							Red
						</NavLink>
					</li>
				</ul>
			</div>
		</>
	);
};
export default ListMenuColor;
