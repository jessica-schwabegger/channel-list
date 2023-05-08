import React, { useState } from "react";
import "./Button.css";

const Button = ({ children, disabled, className, onClick }) => {
  const [toggleDescription, setToggleDescription] = useState(false);
    
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