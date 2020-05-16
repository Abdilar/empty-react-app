import React from 'react';
import Hello from '@/common/components/Hello/Hello.component';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <section>
          <h1>Panel Application</h1>
          <h4>Home page</h4>
          <hr/>

          <Hello/>

        </section>
    );
  }
}
