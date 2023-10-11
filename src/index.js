import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { firebase } from './Firebase';
import { BrowserRouter } from "react-router-dom";

console.log(firebase)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
 
);


