import { SignUpForm } from "../../../components/forms/SignUpForm";

export function SignUp(props) {

    return (
        <div className="signUp">
            <h2>Sign Up</h2>
            <SignUpForm/>
            <p className="signUp__link">Already have an Account?<span className="red" onClick={() => props.backState(!props.state)}>Log in</span></p>
        </div>
    );
}