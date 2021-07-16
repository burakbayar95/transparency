import React, { Component } from "react";

export default class Business extends Component {
  render() {
    return (
      <div key={this.props.key}>
        <tr>{this.props.date}</tr>
        <tr>{this.props.Fquantity}</tr>
      </div>
    );
  }
}
