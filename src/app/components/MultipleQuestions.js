import React, { Component } from 'react';

export default class MultipleQuestions extends Component {
  constructor(args) {
    super(args);
    this.state = { foo: 'foo' };
  }
  render() {
    return <div>{this.state.foo}</div>;
  }
}
