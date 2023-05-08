import React, { useState } from "react";
import { Button } from './Button';
import "./EpisodeDescription.css";

const EpisodeDescription = ({ description }) => {
  const [toggleDescription, setToggleDescription] = useState(false);
    
    return (
        <div>
            {toggleDescription &&
                <p>{description}</p>
            }
            <Button onClick={() => setToggleDescription(!toggleDescription)}>
                {toggleDescription ? "- Visa mindre" : "+ Visa mer"}
            </Button>
        </div>
    )
};

export { EpisodeDescription };