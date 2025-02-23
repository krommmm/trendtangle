import { LogInForm } from "../../../components/forms/LoginForm";
export function LogIn(props) {

    return (
        <div className="logIn">
                <h2>Log In</h2>
            <LogInForm />
            <p className="logIn__link">Don't have Account?<span className="red signIn" onClick={() => props.backState(!props.state)}>Sign up</span></p>
        </div>
    );
}