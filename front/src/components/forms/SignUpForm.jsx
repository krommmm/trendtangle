import { PasswordVerification } from "./signupform/PasswordVerification";
import { useState } from "react";
import { signUp, logIn } from "../../services/service_auth";
export function SignUpForm() {

    const [signUpData, setSignUpData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [validation, setValidation] = useState({
        name: false,
        email: false,
        password: false
    })

    const [submlitAnswer, setSubmitAnswer] = useState(false);

    const [answerData, setAnswerData] = useState({
        success: {
            color: "green", msg: "Sign up successful", active: "false"
        },
        faillure: {
            color: "red", msg: "Sign up failled", active: "false"
        }
    });

    const [passwordValidation, setPasswordValidation] = useState(null);
    const [displayPasswordVerification, setDisplayPasswordVerification] = useState(false);

    function displayAnswer(ok) {
        if (ok) {
            setSubmitAnswer(true);
        } else {
            setSubmitAnswer(false);
        }
    }

    function handlePasswordFocusEnter() {
        if (!displayPasswordVerification) setDisplayPasswordVerification(!displayPasswordVerification);
    }
    function handlePasswordFocusLeave() {
        if (displayPasswordVerification) setDisplayPasswordVerification(!displayPasswordVerification);
    }

    function handlePasswordChange(e) {
        setSignUpData({ ...signUpData, password: e.target.value });
    }

    function regexTestName(name) {
        const testName = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð,.'-]{2,}$/i;
        return testName.test(name) ? true : false;
    }
    function regexTestEmail(email) {
        const testEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,10}$/;
        return testEmail.test(email) ? true : false;
    }

    function handleNameChange(e) {
        const name = e.target.value;
        setSignUpData({ ...signUpData, name: e.target.value });
        setValidation({ ...validation, name: regexTestName(name) });
    }

    function handleEmailChange(e) {
        const email = e.target.value;
        setSignUpData({ ...signUpData, email: e.target.value });
        setValidation({ ...validation, email: regexTestEmail(email) });
    }

    function isFormulaireValid() {
        return (
            validation.name && validation.email && passwordValidation.majuscule &&
            passwordValidation.minuscule && !passwordValidation.space &&
            passwordValidation.chiffre && passwordValidation.specialChar && passwordValidation.charLength
        );
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        setAnswerData({...answerData, success:{...answerData.success, active: "true"}});
        if (!isFormulaireValid) return;
        const signRes = await signUp(signUpData);

        displayAnswer(signRes.ok);

        // if (signRes.ok) {
        //     const logRes = await logIn({
        //         email: signUpData.email,
        //         password: signUpData.password
        //     });
        //     console.log(logRes);
        // }
        form.reset();
    }

    return (
        <form id="form-signUp" method="POST" onSubmit={(e) => handleSubmit(e)}>
            <div className="hidden-inputs">
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" placeholder="Name" onChange={(e) => handleNameChange(e)} />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" placeholder="Email" onChange={(e) => handleEmailChange(e)} />
                </div>

                {displayPasswordVerification && <PasswordVerification inputPassword={signUpData.password} back={setPasswordValidation} />}
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" placeholder="Password" onMouseEnter={() => handlePasswordFocusEnter()} onMouseLeave={() => handlePasswordFocusLeave()} onChange={(e) => handlePasswordChange(e)} />
            </div>
            <div className="submitContainer">
                <button>Submit</button>
                <p
                    className={`visible--${answerData.success.active} submitContainer__answer--${submlitAnswer ? answerData.success.color : answerData.faillure.color} `}>
                    {submlitAnswer ? answerData.success.msg : answerData.faillure.msg}
                </p>
            </div>
        </form>
    );
}