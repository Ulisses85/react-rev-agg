import React, { Component } from "react";

import "./App.css";

const formatNumber = (number) =>
  new Intl.NumberFormat("en", { minimumFractionDigits: 2 }).format(number);

class App extends Component {
  state = {
    products: null,
    error: null,
    filter: "",
  };

  fetchApiData(fileName) {
    return fetch(`api/${fileName}.json`).then((response) => response.json());
  }

  filterHandler = (e) => {
    this.setState({ filter: e.target.value });
  };

  aggregateRevenue(products, filter) {
    const sum = {};

    products.forEach((product) => {
      if (filter && new RegExp(filter, "i").test(product.name) === false) {
        return;
      }

      if (!sum[product.id]) {
        sum[product.id] = { ...product };
      } else {
        sum[product.id].sold += product.sold;
      }
    });

    const result = Object.values(sum);

    result.sort((a, b) =>
      a.name.toUpperCase().localeCompare(b.name.toUpperCase())
    );

    return result;
  }
  productRows = (products) => {
    return products.map((product) => (
      <tr key={product.name}>
        <td>{product.name}</td>
        <td>{formatNumber(product.sold * product.unitPrice)}</td>
      </tr>
    ));
  };

  componentDidMount() {
    Promise.all([
      this.fetchApiData("branch1"),
      this.fetchApiData("branch2"),
      this.fetchApiData("branch3"),
    ])
      .then((data) => {
        this.setState({
          products: [
            ...data[0].products,
            ...data[1].products,
            ...data[2].products,
          ],
        });
      })
      .catch((error) => this.setState({ error }));
  }

  render() {
    if (this.state.products === null || undefined) {
      return "Loading...";
    }
    const products = this.aggregateRevenue(
      this.state.products,
      this.state.filter
    );
    const productRows = this.productRows(products);
    const total = products.reduce(
      (total, product) => total + product.sold * product.unitPrice,
      0
    );

    return (
      <div class="product-list">
        <label>Search Products</label>
        <input type="text" onChange={this.filterHandler} placeholder="input" />
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody>{productRows}</tbody>
          <tfoot>
            <tr>
              <td>Total</td>
              <td>{formatNumber(total)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}

export default App;
