import React from 'react';
import Hello from '@/common/components/Hello/Hello.component';
import Bye from '@/common/components/Bye/Bye.component';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <section>
          <h1>Web Application</h1>
          <h4>Home page</h4>
          <hr/>
          <Hello/>
          <Bye/>
        </section>
    );
  }
}
