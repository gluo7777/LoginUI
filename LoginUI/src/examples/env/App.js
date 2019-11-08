import React from 'react';

export function App() {
    return <div>
        <h1>{process.env.NODE_ENV}</h1>
        <h2>{process.env.REACT_APP_MSG1}</h2>
    </div>
}