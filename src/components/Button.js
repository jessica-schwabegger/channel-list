import React from "react";
import "./Button.css";

const Button = ({ children, disabled, className, onClick }) => {    
    return (
        <button
            disabled={disabled}
            className={className}
            onClick={() => onClick()}
        >
            {children}
        </button>
    )
};

export { Button };