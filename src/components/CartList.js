import { Component } from "../common/Component.js";

export class CartList extends Component {
  constructor(props) {
    super(props);
    this.state = { cart: [] };
    this.updateCart = this.updateCart.bind(this);
    this.props.cartContext.subscribe(this.updateCart);
  }

  updateCart(cart) {
    console.log("Cart updated:", cart); // Verifica que se recibe el carrito actualizado
    this.state.cart = cart;
    this.render();
  }

  // Función para mostrar mensajes de notificación
  showValidationMessage(message) {
    console.log("Attempting to show message:", message); // Para depuración
    let messageBox = document.querySelector(".validation-message");
  
    if (!messageBox) {
      messageBox = document.createElement("div");
      messageBox.className = "validation-message";
      document.body.appendChild(messageBox);
    }
  
    messageBox.textContent = message; // Agrega el mensaje
    messageBox.style.display = "block"; // Muestra el mensaje
  
    // Oculta el mensaje después de 2 segundos
    setTimeout(() => {
      messageBox.style.display = "none";
    }, 5000);
  }
  
  
  render() {
    console.log("Rendering CartList..."); // Log para verificar que el render se ejecuta
    let aside = document.querySelector("aside");
    if (!aside) {
      aside = document.createElement("aside");
      aside.id = "cart-aside";
      document.body.appendChild(aside);
    }

    const cartContainer = document.createElement("div");
    cartContainer.className = "cart-container";
    cartContainer.innerHTML = "";

    // Título del carrito
    const title = document.createElement("h2");
    title.textContent = "Shopping Cart";
    cartContainer.appendChild(title);

    // Lista de productos
    const itemList = document.createElement("ul");
    itemList.className = "cart-items";

    this.state.cart.forEach((item) => {
      console.log("Rendering item:", item); // Log para verificar cada producto del carrito
      const listItem = document.createElement("li");
      listItem.className = "cart-item";

      listItem.innerHTML = `
        <button class="remove-btn" data-id="${item.id}">X</button>
        <img class="item-image" src="${item.image}" alt="${item.name}" />
        <span class="name">${item.name || "No name available"}</span>
        <div class="quantity-controls">
          <button class="decrease-btn" data-id="${item.id}">-</button>
          <span class="quantity">${item.quantity}</span>
          <button class="increase-btn" data-id="${item.id}">+</button>
        </div>
        <span>$${(item.price * item.quantity).toFixed(2)}</span>
      `;

      // Incrementar cantidad
      listItem.querySelector(".increase-btn").addEventListener("click", () => {
        this.props.cartContext.updateQuantity(item.id, item.quantity + 1);
        this.showValidationMessage(`Increased quantity of ${item.name}`);
      });
      

      // Disminuir cantidad
      listItem.querySelector(".decrease-btn").addEventListener("click", () => {
        if (item.quantity > 1) {
          this.props.cartContext.updateQuantity(item.id, item.quantity - 1);
          this.showValidationMessage(`Decreased quantity of ${item.name}`);
        }
      });

      // Eliminar producto
      listItem.querySelector(".remove-btn").addEventListener("click", () => {
        this.props.cartContext.removeProduct(item.id);
        this.showValidationMessage(`Removed ${item.name} from cart`);
      });

      itemList.appendChild(listItem);
    });

    cartContainer.appendChild(itemList);

    // Totales
    const totals = document.createElement("div");
    totals.className = "cart-totals";
    totals.innerHTML = `
      <p>Total Items: ${this.props.cartContext.getTotalItems()}</p>
      <p>Total Price: $${this.props.cartContext.getTotalPrice().toFixed(2)}</p>
    `;
    cartContainer.appendChild(totals);

    const existingContainer = aside.querySelector(".cart-container");
    if (existingContainer) {
      existingContainer.replaceWith(cartContainer);
    } else {
      aside.appendChild(cartContainer);
    }

    console.log("CartList rendered successfully!"); // Log para confirmar que el render terminó correctamente
    return cartContainer;
  }
}
