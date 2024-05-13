import { useState, useRef } from 'react';
import { userSign, userLog } from '../../services/user';
import { useFlip } from '../../FlipContext';

function Signup(props) {
	const [ansPost, setAnsPost] = useState('');
	const [isReady, setIsReady] = useState(false);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isName, setIsName] = useState(false);
	const [isEmail, setIsEmail] = useState(false);
	const msgRef = useRef(null);
	const { toggleFlip } = useFlip();
	
	const [isPassword, setIsPassword] = useState(false);

	const ulRef = useRef(null);
	const passwordCheckerRef = useRef(null);

	const remonterEtat = () => {
		props.remonter(true); 
	};

	const handleName = (e) => {
		regexName(e);
	};
	const handleEmail = (e) => {
		regexEmail(e);
	};
	const handlePassword = (e) => {
		regexPassword(e);
	};

	function regexName(e) {
		let testName =
			/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,}$/i;
		if (testName.test(e.target.value)) {
			setName(e.target.value);
			setIsName(true);
		} else {
			setName('');
			setIsName(false);
		}
	}
	function regexEmail(e) {
		let testEmailName = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,8}$/;
		if (testEmailName.test(e.target.value)) {
			setEmail(e.target.value);
			setIsEmail(true);
		} else {
			setEmail('');
			setIsEmail(false);
		}
	}

	function regexPassword(e) {
		const value = e.target.value;
		const hasNoSpace = !/\s/.test(value);
		const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
		const meetsCharRequirements =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(value);

		ulRef.current.children[0].classList.toggle(
			'green',
			meetsCharRequirements
		);
		ulRef.current.children[1].classList.toggle('green', hasSpecialChar);
		ulRef.current.children[2].classList.toggle('green', hasNoSpace);

		const isPasswordValid =
			meetsCharRequirements && hasSpecialChar && hasNoSpace;
		setIsPassword(isPasswordValid);
		if (isPasswordValid) { 
			setPassword(value);
		} else {
			setPassword('');
		}
	}
	const handleBlur = () => {
		passwordCheckerRef.current.classList.add('hidden');
	};

	const handleFocus = () => {
		passwordCheckerRef.current.classList.remove('hidden');
	};
	async function handleSignup(e) {
		e.preventDefault();
		if (isName && isEmail && isPassword) {
			setIsReady(true);
			let res = await userSign(name, email, password);
			console.log(res);
			setAnsPost(res.msg);
			if (res.msg === 'User created') {
				let res2 = await userLog(email, password);
				console.log(res2);
				msgRef.current.textContent=`${res.msg}`;
				msgRef.current.parentElement.classList.toggle("hidden");
				localStorage.setItem('token', JSON.stringify(res2.token));
			}
		} else {
			setIsReady(false);
			setAnsPost('Veuillez remplir tous les champs');
		}
		toggleFlip();
	}

	return (
		<>
			<div className="signup">
				<p className="signup__title">Sign In</p>
				<form className="signup__form">
					<p className=" signup__form-title bold">
						Create your Account
					</p>
				
					<div
						ref={passwordCheckerRef}
						className="signup__form__passwordChecker hidden"
					>
						<ul ref={ulRef}>
							<li className="signup__form__passwordChecker-nbChars">
								6 chars (maj, min, nb)
							</li>
							<li className="signup__form__passwordChecker-charSpe">
								1 charSpecial
							</li>
							<li className="signup__form__passwordChecker-noSpace">
								no space
							</li>
						</ul>
					</div>
					<input
						type="text"
						className="signup__form-name"
						placeholder="name"
						onChange={(e) => handleName(e)}
					/>
					<input
						type="text"
						className="signup__form-email"
						placeholder="email"
						onChange={(e) => handleEmail(e)}
					/>
					<input
						type="text"
						className="signup__form-password"
						placeholder="password"
						onChange={(e) => handlePassword(e)}
						onBlur={handleBlur}
						onFocus={handleFocus}
					/>
					<button
						className="signup__form-btn btn"
						onClick={(e) => handleSignup(e)}
					>
						Sign In
					</button>
				</form>
				<p className="ansPost">{ansPost}</p>
				<p className="signup__change">
					Already have an Account?{' '}
					<span className="red bold cursor" onClick={remonterEtat}>
						Log in
					</span>
				</p>
			</div>
			<div className="msg_box hidden">
				<p ref={msgRef}></p>
			</div>
		
		</>
	);
}
export default Signup;
