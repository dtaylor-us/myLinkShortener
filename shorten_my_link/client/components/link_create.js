import React, {Component} from 'react';

class LinkCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      save: ''
    };
  }

  handleSubmit(event) {
    
    event.preventDefault();
    
    Meteor.call('links.insert', this.refs.link.value, (error, save) => {
      
      if (error) {
        this.setState({error: 'Enter a valid URL', save: ''});
      } else {
        // set timer to clear error messeges after btn is clicked
        setTimeout(() => { this.setState({save: ''}) }, 1000);
        this.setState({save: 'URL has been saved!', error: ''});
        this.refs.link.value = '';
      }
    });
  }

  render() {
    return (
      <form onSubmit={this
        .handleSubmit
        .bind(this)}>
        <div className="form-group">
          <label>Link to shorten</label>
          <input ref="link" className="form-control"/>
        </div>
        <div className="text-danger">
          {this.state.error}
        </div>
        <div className="text-success">
          {this.state.save}
        </div>
        <button className="btn btn-primary">
          Shorten!
        </button>
      </form>
    );
  }
};

export default LinkCreate;