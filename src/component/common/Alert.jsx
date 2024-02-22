// Alert.js
import React, { useState } from 'react';
import { useAlert } from './AlertContext';
import styles from './alert.module.css'

export const Alert = () => {
    const { alert, closeAlert } = useAlert();
    const [visible, setVisible] = useState(true);
    if (!alert.show) return null;
    return (
        <>
        { visible ?  (
        <div  className={styles.alert}>
            <div onClick={()=>{closeAlert()}} className={styles.topbar}>X</div>
            {alert.message}
        </div> ) : <></>
        }
        </>
    );
};