import React from 'react';

export default class NotFoundPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: ""
    }
  }

  render() {
    return (
      <section>
        <h1>Not Found</h1>
        <p>{this.state.description}</p>
      </section>
    );
  }
}
