import { useState } from "react";
import { logIn } from "../../services/service_auth";
import { useFlip } from "../../context/context_flip";
import { useUser } from "../../context/context_userConnected";

export function LogInForm() {
        const { toggleFlip } = useFlip();
        const { toggleUser } = useUser();
    const [logInData, setLogInData] = useState({
        email: "",
        password: ""
    });

    const [submlitAnswer, setSubmitAnswer] = useState(false);

    const [answerData, setAnswerData] = useState({
        success: {
            color: "green", msg: "Connection successful", active: "false"
        },
        faillure: {
            color: "red", msg: "Connection failled", active: "false"
        }
    });

    function handleEmailChange(e) {
        setLogInData({ ...logInData, email: e.target.value });
    };

    function handlePasswordChange(e) {
        setLogInData({ ...logInData, password: e.target.value });
    };

    function displayAnswer(ok) {
        if (ok) {
            setSubmitAnswer(true);
        } else {
            setSubmitAnswer(false);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const res = await logIn(logInData);
        form.reset();
        setAnswerData({...answerData, success:{...answerData.success, active: "true"}});
        
        localStorage.setItem("trendtangle-auth-token", JSON.stringify(res.data.token));
        displayAnswer(res.ok);
        toggleFlip();
        toggleUser();
    };
 
    return (
        <div className="logInForm" onSubmit={(e) => handleSubmit(e)}>
            <form id="form-login" method="POST">
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" placeholder="Email" onChange={(e) => handleEmailChange(e)} />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" placeholder="Password" onChange={(e) => handlePasswordChange(e)} />
                </div>
                <div className="submitContainer">
                    <button>Submit</button>
                    <p
                        className={`visible--${answerData.success.active} submitContainer__answer--${submlitAnswer ? answerData.success.color : answerData.faillure.color} `}>
                        {submlitAnswer ? answerData.success.msg : answerData.faillure.msg}
                    </p>
                </div>
            </form>
        </div>
    );
};