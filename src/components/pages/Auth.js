import { useState, useEffect } from 'react';
import Login from '../others/Login';
import Signup from '../others/Signup';

function Auth(props) {
	const [isLogin, setIsLogin] = useState(true);
	const [toggle, setToggle] = useState(false);

	useEffect(() => {
		props.remonterToApp(toggle);
	}, [toggle,props]);

	return (
		<>
			<div className="auth">
				{isLogin && (
					<Login remonter={setIsLogin} remonterToggle={setToggle} />
				)}
				{!isLogin && <Signup remonter={setIsLogin} />}
			</div>
		</>
	);
}
export default Auth;
