import React from 'react';

class EmailForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '' };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  update(field) {
    return e => this.setState({
      [field] : e.currentTarget.value
    });
  }



  renderErrors() {

  }

  clear(e) {
    e.preventDefault();
    this.setState({ email: '' });
  }

  render() {
    return (
      <div>
        <h1>Email Validator</h1>

      </div>
    );
  }
}

export default EmailForm;
