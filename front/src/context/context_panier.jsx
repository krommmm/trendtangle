import React, { createContext, useState, useContext } from 'react';

const PanierContext = createContext();

export const PanierProvider = ({ children }) => {
    const [panierFlip, setPanierFlip] = useState(false);

    const togglePanier = () => {
        setPanierFlip(prevPanierFlip => !prevPanierFlip); 
    };

    return (
        <PanierContext.Provider value={{ panierFlip, togglePanier }}>
            {children}
        </PanierContext.Provider>
    );
};

export const usePanier = () => {
    return useContext(PanierContext); 
};
