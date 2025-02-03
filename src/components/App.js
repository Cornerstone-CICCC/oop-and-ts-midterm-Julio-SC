import { Component } from "../common/Component.js";
import { ProductList } from "./ProductList.js";
import { CartList } from "./CartList.js";
import { Header } from "./Header.js";
import { Footer } from "./Footer.js";


export class App extends Component {
  render() {
    const appContainer = document.createElement("div");
    appContainer.className = "container";

    // Header
    const header = new Header({ cartContext: this.props.cartContext }).render();
    appContainer.appendChild(header);

    // Main Wrapper
    const mainWrapper = document.createElement("div");
    mainWrapper.className = "wrapper";
    mainWrapper.innerHTML = `
      <main>
        <h2>Products</h2>
      </main>
      <aside></aside>
    `;

    // Product List
    const productList = new ProductList({ cartContext: this.props.cartContext });
    productList.mount(mainWrapper.querySelector("main"));

    // Cart List
    const cartList = new CartList({ cartContext: this.props.cartContext });
    cartList.mount(mainWrapper.querySelector("aside"));

    appContainer.appendChild(mainWrapper);

    // Footer
    const footer = new Footer({ cartContext: this.props.cartContext }).render();
    appContainer.appendChild(footer);

    return appContainer;
  }
}

