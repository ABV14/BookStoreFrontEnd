import React from 'react';
import { Link } from 'react-router-dom';
function ThankYou(props) {
    return (
        <div className="container">
            <h1 className="mt-5 display-3">Thank you for ordering</h1>
            
       <Link className="m-auto btn btn-success mt-5" to="/home">
            Shop More
          </Link>
        </div>
    );
}

export default ThankYou;