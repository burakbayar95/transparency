import React, { Component } from "react";
import Business from "./Business";

export default class Work extends Component {
  render() {
    return (
      <tr>
        <td>
          {this.props.dates.map((date, i) => (
            <Business key={i} date={date} />
          ))}
        </td>

        <td>
          {this.props.Fquantity.map((Fquantity, i) => (
            <Business key={i} date={Fquantity} />
          ))}
        </td>

        <td>
          {this.props.FPrice.map((FPrice, i) => (
            <Business key={i} date={FPrice} />
          ))}
        </td>

        <td>
          {this.props.Weight.map((Weight, i) => (
            <Business key={i} date={Weight} />
          ))}
        </td>
      </tr>
    );
  }
}
