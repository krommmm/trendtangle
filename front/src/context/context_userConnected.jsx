import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(false);

    const toggleUser = () => {
        setUser(prevUser => !prevUser);
    };

    return (
        <UserContext.Provider value={{ user, toggleUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext); 
};
