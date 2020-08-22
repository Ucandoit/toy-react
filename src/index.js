import { createElement, render } from "./core/toy-react";
import { Component } from "./core/component";

class MyComponent extends Component {
  render() {
    return (
      <div>
        <h1>test</h1>
        {this.children}
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
