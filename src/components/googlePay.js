import React, { Component } from "react";

export default class GooglePay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
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
        // fields["upiID"] = "";
        // this.setState({fields:fields});
        this.setState({
          formSubmitted: false
        });
        this.props.Tochecked();
        
    }
}
validateForm() {
let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    
    
if (!fields["upiID"]) {
      formIsValid = false;
      errors["upiID"] = "*Please enter your UPI-ID.";
    }
if (typeof fields["upiID"] !== "undefined") {
      //regular expression for email validation
      var pattern = new RegExp('^(.+)@(.+)$');
      if (!pattern.test(fields["upiID"])) {
        formIsValid = false;
        errors["upiID"] = "*Please enter valid UPI Id.";
      }
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
     <h3 className='text-center'>UPI Payment</h3>
      <form method="post"  name="userRegistrationForm"  onSubmit= {this.submituserRegistrationForm} >
      
      <label>UPI ID:</label>
      <input type="text" className="form-control" placeholder='UPI-ID' name="upiID" value={this.state.fields.upiID} 
         onChange={ (e) => {this.handleChange(e);this.validateForm();} }
          onBlur = {(e) => {this.handleTouch(e);this.validateForm();} } />
         {
          this.state.formSubmitted || this.state.touched.upiID
          ?
            <div className="errorMsg text-danger">{this.state.errors.upiID}</div>
          :
            ''
        }
      
      
      <input type="submit" className="btn btn-success mt-3"  value="Confirm"/>
      </form>
  </div>
</div>
);
}
}
