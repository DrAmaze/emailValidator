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

  // Updates the state as user inputs
  update(field) {
    return e => this.setState({
      [field] : e.currentTarget.value
    });
  }

  // Handles the email validation logic and the output response
  handleSubmit(e) {
    e.preventDefault();
    let valid = this.verifyEmail(this.state.email);

    return this.validMsg(valid);
  }

  // Logic for email validation check. First two checks are there for
  // optimization purposes.
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
    // email is valid. I utilize a set here for a check in constant time.
    const validFinalLetters = new Set([
      'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q',
      'r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H',
      'I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y',
      'Z'
    ]);
    if (!validFinalLetters.has(this.state.email.split('').pop())) {
      return false;
    }

    // Regular expression logic that checks for valid email structure
    let pattern = /^([\w\.]+)@[a-zA-Z_]+?\.[a-zA-Z].{2,6}$/;

    return pattern.test(this.state.email);
  }

  // Response message based on validity of email
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
