import React from 'react';

class EmailForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      submitMsg: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.verifyEmail = this.verifyEmail.bind(this);
    this.validMsg = this.validMsg.bind(this);
  }

  update(field) {
    return e => this.setState({
      [field] : e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let valid = this.verifyEmail(this.state.email);

    return this.validMsg(valid);
  }

  verifyEmail(email) {
    // A simple check to ensure there is only one '@'
    let atCount = 0;
    this.state.email.split("").forEach(letter => {
      if (letter === '@') {
        atCount++;

        // optimize solution by breaking and returning false if two '@'
        // are found in the email address
        if (atCount > 1) {
          return false;
        }
      }
    });

    // Logic to ensure final character is a letter. Essentially it pops
    // the final character of the email address off and verifys the
    // email is valid
    let validFinalLetters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (!validFinalLetters.split('').includes(this.state.email.split('').pop())) {
      return false;
    }

    // Regular expression logic that checks for valid email structure
    var pattern = /^([\w\.]*)@[a-zA-Z_]+?\.[a-zA-Z].{2,6}$/;

    return pattern.test(this.state.email);
  }

  validMsg(validEmail) {
    let email = this.state.email;
    if (email === '') {
      this.setState({
        submitMsg: `Please enter an email address`
      });
    } else if (validEmail) {
      this.setState({
        submitMsg: `Congratulations! ${email} is a valid email address`
      });
    } else {
      this.setState({
        submitMsg: `${email} is NOT a valid email address`
      });
    }
  }

  render() {
    return (
      <div className='email'>
        <form onSubmit={this.handleSubmit}>
          <h1>Email Validator</h1>

          <input
            className='user-input'
            type='text'
            onChange={this.update('email')}
            placeholder={'Type email ...'}/>
          <br/>
          <input
            className='submit'
            type='submit'
            value='Verify Email'/>
        </form>

        <div className='result'>
          {this.state.submitMsg}
        </div>
      </div>
    );
  }
}

export default EmailForm;
