import { useState } from "react";

export function SelectOption({ info, back }) {

    const [selectedOption, setSelectedOption] = useState("all");

    function handleChange(e) {
        setSelectedOption(e.target.value);
        back(e.target.value);
    };

    /* infoModel = selectOptionInfos[i]
     const selectOptionInfos = [
        { labelName: "category", optionNames: ["pull", "t-shirt", "pants", "shoes", "all"] },
    ];
    */

    return (
        <>
            <label htmlFor={`selection-${info.labelName}`}>{info.labelName}:</label>
            <select id={`selection-${info.labelName}`} value={selectedOption} onChange={(e) => handleChange(e)}>
                {info.optionNames.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select> 
        </>
    );
}