import React, { createContext, useContext, useState } from 'react';

// สร้าง Context
const UserContext = createContext();

// สร้าง Provider
export const UserProvider = ({ children }) => {
    const [userName, setUserName] = useState('');

    return (
        <UserContext.Provider value={{ userName, setUserName }}>
            {children}
        </UserContext.Provider>
    );
};

// สร้าง Hook สำหรับใช้งาน Context
export const useUser = () => useContext(UserContext);
