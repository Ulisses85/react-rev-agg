import React, { Component } from "react";

import "./App.css";

const formatNumber = (number) =>
  new Intl.NumberFormat("en", { minimumFractionDigits: 2 }).format(number);
class App extends Component {
  state = {
    products: null,
    filter: "",
  };

  render() {
    return (
      <div class="product-list">
        <label>Search Products</label>
        <input type="text" placeholder="input" />
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody></tbody>
          <tfoot>
            <tr>
              <td>Total</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}

export default App;
