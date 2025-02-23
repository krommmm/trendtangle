function Footer() {
	return (
		<>
			<div className="footer">
				<div className="footer_container">
					{' '}
					<div className="footer__category">
						<p className="footer__category-title">ABOUT US</p>
						<p className="footer__category-lorem">
							Lorem ipsum dolor sit amet, consectetur adipisicing
							elit, sed do eiusmod tempor incididunt ut.
						</p>
						<ul>
							<li className="footer__category-infoUs">
								<i className="fa-solid fa-location-dot"></i>{' '}
								1734 Stonecoal Road
							</li>
							<li className="footer__category-infoUs">
								<i className="fa-solid fa-phone"></i>{' '}
								+021-95-51-84
							</li>
							<li className="footer__category-infoUs">
								{' '}
								<i className="fa-solid fa-envelope"></i>{' '}
								email@email.com
							</li>
						</ul>
					</div>
					<div className="footer__category">
						<p className="footer__category-title">CATEGORIES</p>
						<ul>
							<li className="footer__category-infoUs">pulls</li>
							<li className="footer__category-infoUs">
								pantalons
							</li>
							<li className="footer__category-infoUs">
								t-shirts
							</li>
							<li className="footer__category-infoUs">
								chaussures
							</li>
						</ul>
					</div>
					<div className="footer__category">
						<p className="footer__category-title">INFORMATION</p>
						<ul>
							<li className="footer__category-infoUs">
								About Us
							</li>
							<li className="footer__category-infoUs">
								Contact Us
							</li>
							<li className="footer__category-infoUs">
								Privacy Policy
							</li>
							<li className="footer__category-infoUs">
								Terms & Conditions
							</li>
						</ul>
					</div>
					<div className="footer__category">
						<p className="footer__category-title">SERVICE</p>
						<ul>
							<li className="footer__category-infoUs">
								My Account
							</li>
							<li className="footer__category-infoUs">
								View Cart
							</li>
							<li className="footer__category-infoUs">
								Track My Order
							</li>
							<li className="footer__category-infoUs">Help</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
}
export default Footer;
