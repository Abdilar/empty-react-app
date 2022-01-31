import {Component} from 'react';
import {ErrorTemplate} from './Error.template';

class Error extends Component {
  componentDidMount() {
    console.log('in Error: ', this.props);
  }

  render() {
    return <ErrorTemplate />;
  }
}

export {Error};
