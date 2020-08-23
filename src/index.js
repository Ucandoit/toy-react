import { createElement, render } from "./core/toy-react";
import { Component } from "./core/component";

class MyComponent extends Component {
  constructor() {
    super();
    this.state = {
      a: 1,
      b: 2,
    };
  }
  render() {
    return (
      <div>
        <h1>test</h1>
        <button
          onClick={() => {
            this.setState({ a: this.state.a + 1 });
          }}
        >
          Add
        </button>
        <div>{this.state.a}</div>
        <div>{this.state.b}</div>
      </div>
    );
  }
}

const a = (
  <MyComponent id="test" class="abc">
    <div>aaa</div>
    <div>bbb</div>
  </MyComponent>
);

render(a, document.body);
