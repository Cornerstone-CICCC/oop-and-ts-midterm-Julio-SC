import { Component } from "../common/Component.js";

export class ProductItem extends Component {
  constructor(props) {
    super(props);
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  // Función para mostrar mensajes de validación
  showValidationMessage(message) {
    let messageBox = document.querySelector(".validation-message");
    if (!messageBox) {
      messageBox = document.createElement("div");
      messageBox.className = "validation-message";
      document.body.appendChild(messageBox);
    }
    messageBox.textContent = message;
    messageBox.style.display = "block";

    setTimeout(() => {
      messageBox.style.display = "none";
    }, 2000);
  }

  handleAddToCart() {
    this.props.cartContext.addProduct({
      id: this.props.product.id,
      name: this.props.product.title,
      price: this.props.product.price,
      image: this.props.product.image
    });

    this.showValidationMessage(`Added ${this.props.product.title} to cart`);
  }

  render() {
    const product = document.createElement("div");
    product.className = "product-item";

    product.innerHTML = `
      <img class="item-image" src="${this.props.product.image}" alt="${this.props.product.title}">
      <h3>${this.props.product.title}</h3>
      <p>Price: $${this.props.product.price.toFixed(2)}</p>
      <button class="add-cart-btn">Add to Cart</button>
    `;

    product.querySelector(".add-cart-btn").addEventListener("click", this.handleAddToCart);

    return product;
  }
}
