import React, { createContext, useState, useContext } from 'react';

const FlipContext = createContext();

export const FlipProvider = ({ children }) => {
    const [flip, setFlip] = useState(false);

    const toggleFlip = () => {
        setFlip(prevFlip => !prevFlip);
    };

    return (
        <FlipContext.Provider value={{ flip, toggleFlip }}>
            {children}
        </FlipContext.Provider>
    );
};

export const useFlip = () => {
    return useContext(FlipContext); 
};
