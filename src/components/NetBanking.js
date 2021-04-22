import React from "react";

function NetBanking(props) {
    
  return (
    <div>
      <h3 className='text-center'>Net Banking </h3>
          <label htmlFor="bank" className="form-label">
                Please Select your Bank
          </label>
      <select className="form-select" name="bank" placeholder="Please select a bank " aria-label="Default select example">
      <option value="" selected disabled>--Please select your Bank--</option>
        <option onClick={viewCheckbox} value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
      <div className="form-check mt-2">
            <input
              className="form-check-input "
              type="checkbox"
              value="net"
              id="flexCheckDefault"
              onClick={paymentFunction}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault" onClick={paymentFunction}>
              I agree to the terms and conditions of the payment Gateway
            </label>
          </div>




    </div>
  );
  function paymentFunction(){
    props.Tochecked();

}
function viewCheckbox(){

}
}

export default NetBanking;
