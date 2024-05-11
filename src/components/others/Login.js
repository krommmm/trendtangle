import { useState, useRef } from 'react';
import { userLog } from '../../services/user';
import { useFlip } from '../../FlipContext';

function Login(props) {
	const [isReady, setIsReady] = useState(false);
	const [myBool, setMyBool] = useState(false);
	const { toggleFlip } = useFlip();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const formRef = useRef(null);
	const passwordRef = useRef(null);
	const msgRef = useRef(null);

	const remonterEtat = () => {
		props.remonter(false);
	};

	const handleEmail = (e) => {
		setEmail(e.target.value);
	};
	const handlePassword = (e) => {
		setPassword(e.target.value);
	};

	async function handleLog(e) {
		e.preventDefault();
		if (email !== '' && email !== '') {
			setIsReady(true);
			const res = await userLog(email, password);
			console.log(res);
		
			msgRef.current.textContent=`${res.msg}`;
				msgRef.current.parentElement.classList.add('hidden');
			await new Promise((resolve) => setTimeout(resolve, 10));
			msgRef.current.parentElement.classList.remove('hidden');
			if(res.msg!=="User connected"){
				return;
			}
			localStorage.setItem('token', JSON.stringify(res.token));
			props.remonterToggle(!myBool);
		} else {
			setIsReady(false);
		}
		toggleFlip();
	}

	function handleShowVisibility(e){
		e.target.classList.toggle("hidden");
		e.target.nextSibling.classList.toggle("hidden");
		passwordRef.current.type="password";
	}
	function handleHideVisibility(e){
		e.target.classList.toggle("hidden");
		e.target.previousSibling.classList.toggle("hidden");
		passwordRef.current.type="text";
	}

	return (
		<>
			<div className="login">
				<p className="login__title">Log In</p>
				<form className="login__form" ref={formRef}>
					<input
						type="text"
						className="login__form-email"
						placeholder="email"
						onChange={(e) => handleEmail(e)}
					/>
					<input
						type="password"
						className="login__form-password"
						placeholder="password"
						onChange={(e) => handlePassword(e)}
						ref={passwordRef}
					/>
					<div className="login__form__changeVisibility">
						{' '}
						<i class="fa-solid fa-eye-slash hidden" onClick={handleShowVisibility}></i>
						<i class="fa-solid fa-eye" onClick={handleHideVisibility}></i>
					</div>

					<button
						className="login__form-btn btn"
						onClick={(e) => handleLog(e)}
					>
						Log In
					</button>
				</form>
				<p className="login__change">
					Don't have Account?{' '}
					<span className="red bold cursor" onClick={remonterEtat}>
						Sign in
					</span>
				</p>
			</div>
			<div className="msg_box hidden">
				<p ref={msgRef}></p>
			</div>
		</>
	);
}
export default Login;
