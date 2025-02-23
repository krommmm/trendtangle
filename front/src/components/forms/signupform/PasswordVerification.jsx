import { useState, useEffect } from "react";

export function PasswordVerification({inputPassword, back}) {

    const [majuscule, setMajuscule] = useState("false");
    const [minuscule, setMinuscule] = useState("false");
    const [space, setSpace] = useState("true");
    const [chiffre, setChiffre] = useState("false");
    const [specialChar, setSpecialChar] = useState("false");
    const [charLength, setCharLength] = useState("false");


    useEffect(() => {
        const password = testPassword();
        setMajuscule(JSON.stringify(password.majuscule));
        setMinuscule(JSON.stringify(password.minuscule));
        setSpace(JSON.stringify(!password.space));
        setChiffre(JSON.stringify(password.chiffre));
        setSpecialChar(JSON.stringify(password.specialChar));
        setCharLength(JSON.stringify(password.charLength));
        back(password);
    }, [inputPassword]);

    function testPassword() {
        let password = inputPassword;
        const isPasswordValid = {
            majuscule: regexTestpasswordMaj(password),
            minuscule: regexTestpasswordMin(password),
            space: regexTestpasswordSpace(password),
            chiffre: regexTestpasswordNumber(password),
            specialChar: regexTestpasswordSpecialChar(password),
            charLength: regexTestpassword12Char(password)
        };
        return isPasswordValid;
    }


    function regexTestpasswordMaj(password) {
        let testMajuscule = /[A-Z]/;
        return testMajuscule.test(password) ? true : false;
    }
    function regexTestpasswordMin(password) {
        let testMinuscule = /[a-z]/;
        return testMinuscule.test(password) ? true : false;
    }
    function regexTestpasswordSpace(password) {
        let testNoSpace = /(?=.*[\s])/gi;
        return testNoSpace.test(password) ? true : false;
    }
    function regexTestpasswordNumber(password) {
        let testChiffre = /[0-9]/;
        return testChiffre.test(password) ? true : false;
    }
    function regexTestpasswordSpecialChar(password) {
        let testCharSpecial = /[\^>$*<%+=@!,;:?.]/;
        return testCharSpecial.test(password) ? true : false;
    }
    function regexTestpassword12Char(password) {
        let test12Char = /^.{12,}$/;
        return test12Char.test(password) ? true : false;
    }

    return (

        <div className="passwordVerification">
            <div className="passwordVerification__body">
                <h3>Password must contain:</h3>
                <div className={majuscule}><i className={`fa-solid fa-${JSON.parse(majuscule) ? "check" : "xmark"}`}></i><p>At least 1 uppercase</p></div>
                <div className={minuscule}><i className={`fa-solid fa-${JSON.parse(minuscule) ? "check" : "xmark"}`}></i><p>At least 1 lowercase</p></div>
                <div className={chiffre}><i className={`fa-solid fa-${JSON.parse(chiffre) ? "check" : "xmark"}`}></i><p>At least 1 number</p></div>
                <div className={specialChar}><i className={`fa-solid fa-${JSON.parse(specialChar) ? "check" : "xmark"}`}></i><p>At least 1 special character</p></div>
                <div className={charLength}><i className={`fa-solid fa-${JSON.parse(charLength) ? "check" : "xmark"}`}></i><p>At least 12 characters</p></div>
                <div className={space}><i className={`fa-solid fa-${JSON.parse(space) ? "check" : "xmark"}`}></i><p>No space</p></div>
            </div>
        </div>
    );
}