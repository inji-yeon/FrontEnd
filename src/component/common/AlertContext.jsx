
import React, { createContext, useState, useContext } from 'react';

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState({ show: false, message: '' });

    const showAlert = (message) => {
        setAlert({ show: true, message });
        // setTimeout(() => setAlert({ show: false, message: '' }), 100000); // 3초 후 숨김
    };
    const closeAlert = () => {
        setAlert({show: false});
    }

    return (
        <AlertContext.Provider value={{ alert, showAlert, closeAlert }}>
            {children}
        </AlertContext.Provider>
    );
};