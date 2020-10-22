import React, { useState } from 'react';

export function Saved(props){

    return (
        <div>
            {props.saved.map((save, index) => (
                <p key={index}>Hello, {save.title}!</p>
            ))}
        </div>
    );
}