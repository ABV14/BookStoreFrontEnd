import React from 'react';

function description(props) {
     const data = localStorage.getItem('description')
     const img= localStorage.getItem('image')
    
  
    return (
        <div className="container m-auto mt-4">
        <div className="card ">
            <div className="row border-success g-0 ">

        <div className="col-12 col-sm-3 "><img src={img} className="w-100 h-100" alt='asdfasdfasdf'></img></div>
        <div className="col-12 col-sm-9 bg-dark text-white p-1 fs-5">{data}</div>
        </div>
       
            </div>
      </div>
    );
}

export default description;