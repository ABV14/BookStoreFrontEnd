import React, { Component } from 'react';


 
 
export default class CreditCard extends Component {
  constructor(props) {
    super(props);
     this.state = {
        fields: {cardOwnerName:' ',cvv:' ',Month:' ',cardNumber:" "},
        errors: {},
        touched: {},
        formSubmitted: false
      }
// this.handleChange = this.handleChange.bind(this);
      this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);
};
handleChange(e) {
      let fields = this.state.fields;
      
      fields[e.target.name] = e.target.value;
      this.setState({
        fields
      });
}
  
    handleTouch(e){
       let {touched} = this.state;
      if(e.target.name && touched[e.target.name] !== true){
          
          touched[e.target.name] = true;
           this.setState({
            touched
          });
      }
    }
  
    submituserRegistrationForm(e) {
      e.preventDefault();
      this.setState({
        formSubmitted: true
      });
      if (this.validateForm()) {
          // let fields = {};
          // fields["cardOwnerName"] = "";
          // fields["cvv"] = "";
          // fields["cardNumber"] = "";
          // fields["Month"] = "";
          // this.setState({fields:fields});
          this.setState({
            formSubmitted: false
          });
          this.props.Tochecked()
          // alert("Form submitted");
      }
}
validateForm() {
let fields = this.state.fields;
      let errors = {};
      let formIsValid = true;
      
      if (!fields["cardOwnerName"]) {
        formIsValid = false;
        errors["cardOwnerName"] = "*Please enter your card Holder Name.";
      }
if (typeof fields["cardOwnerName"] !== "undefined") {
        if (!fields["cardOwnerName"].match(/^[a-zA-Z ]*$/)) {
          formIsValid = false;
          errors["cardOwnerName"] = "*Please enter alphabet characters only.";
        }
      }
if (!fields["cvv"]) {
        formIsValid = false;
        errors["cvv"] = "*Please enter your CVV.";
      }
if (typeof fields["cvv"] !== "undefined") {
        //regular expression for email validation
        if (!fields["cvv"].match(/^[0-9]{3}$/)) {
          formIsValid = false;
          errors["cvv"] = "*Please enter valid CVV no.";
        }
      }
if (!fields["cardNumber"]) {
        formIsValid = false;
        errors["cardNumber"] = "*Please enter your Card no.";
      }
if (typeof fields["cardNumber"] !== "undefined") {
        if (!fields["cardNumber"].match(/^[0-9]{10}$/)) {
          formIsValid = false;
          errors["cardNumber"] = "*Please enter valid Card no.";
        }
      }
if (!fields["Month"]) {
        formIsValid = false;
        errors["Month"] = "*Please enter your Month and Year.";
      }
      
      this.setState({
        errors: errors
      });
      return formIsValid;
    }
    render() {
    return (
      <div id="main-registration-container">
     <div id="register">
        <h3 className="text-center">Credit Card </h3>
        <form method="post"  name="userRegistrationForm"  onSubmit= {this.submituserRegistrationForm} >
        <label>Card Number</label>
        <input type="text" className="form-control" name="cardNumber" value={this.state.fields.cardNumber} 
           onChange={ (e) => {this.handleChange(e);this.validateForm();} }
            onBlur = {(e) => {this.handleTouch(e);this.validateForm();} }   />
          {
            this.state.formSubmitted || this.state.touched.cardNumber
            ?
              <div className="errorMsg text-danger ">{this.state.errors.cardNumber}</div>
            :
              ''
          }
        <label>Card Holder Name</label>
        <input type="text" className="form-control" name="cardOwnerName" value={this.state.fields.cardOwnerName} 
          onChange={ (e) => {this.handleChange(e);this.validateForm();} }
            onBlur = {(e) => {this.handleTouch(e);this.validateForm();} } />
        {
            this.state.formSubmitted || this.state.touched.cardOwnerName
            ?
              <div className="errorMsg text-danger">{this.state.errors.cardOwnerName}</div>
            :
              ''
        }


        








          <div className="row">
          <div className="col-6">
          
          
        <label>Month</label>
        <input type="Month" name="Month" className="form-control col-6" value={this.state.fields.Month} 
           onChange={ (e) => {this.handleChange(e);this.validateForm();} }
            onBlur = {(e) => {this.handleTouch(e);this.validateForm();} } />
           {
            this.state.formSubmitted || this.state.touched.Month
            ?
             
              <div className="errorMsg text-danger">{this.state.errors.Month}</div>
            :
            ''
          }
          


          
          </div>
          <div className="col-6">
        <label>CVV:</label>
        <input type="text" name="cvv" className="form-control " value={this.state.fields.cvv} 
           onChange={ (e) => {this.handleChange(e);this.validateForm();} }
            onBlur = {(e) => {this.handleTouch(e);this.validateForm();} } />
           {
            this.state.formSubmitted || this.state.touched.cvv
            ?
              <div className="errorMsg text-danger">{this.state.errors.cvv}</div>
            :
              ''
          }
          </div>
        </div>
        <input type="submit" className="mt-3 btn btn-primary"  value="Confirm"/>
        </form>
    </div>
</div>
);
  }
}
 