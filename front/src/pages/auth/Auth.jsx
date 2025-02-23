import { useState } from 'react';
import { SignUp } from "./signup/SignUp.jsx";
import { LogIn } from "./login/LogIn.jsx";

export function Auth() {

    const [currentState, setCurrentState] = useState(false);

    return (
        <div className="auth">

            {currentState && (
                <LogIn backState={setCurrentState} state={currentState} />
            )}
            {!currentState && <SignUp backState={setCurrentState} state={currentState} />}
        </div>
    );
}; 