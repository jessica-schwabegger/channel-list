import React, { useState } from "react";
import "./EpisodeDescription.css";

const EpisodeDescription = ({ description }) => {
  const [toggleDescription, setToggleDescription] = useState(false);
    
    return (
        <div>
            {toggleDescription &&
                <p>{description}</p>
            }
            <button onClick={() => setToggleDescription(!toggleDescription)}>
                {toggleDescription ? "- Visa mindre" : "+ Visa mer"}
            </button>
        </div>
    )
};

export { EpisodeDescription };