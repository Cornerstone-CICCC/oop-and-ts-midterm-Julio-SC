import { Component } from "../common/Component.js";

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { totalItems: 0 }; // Inicializa el total de ítems en el estado
    this.updateTotalItems = this.updateTotalItems.bind(this);
    this.props.cartContext.subscribe(this.updateTotalItems); // Suscribe a los cambios en el carrito
  }

  updateTotalItems(cart) {
    // Calcula el total de ítems
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    if (this.state.totalItems !== totalItems) {
      // Actualiza el estado y re-renderiza solo si cambia el total
      this.state.totalItems = totalItems;
      this.render(); // Renderiza el componente para reflejar los cambios
    }
  }

  render() {
    // Buscar o crear el contenedor del header
    let header = document.querySelector(".header");
    if (!header) {
      header = document.createElement("header");
      header.className = "header";
      document.body.prepend(header); // Añade el header al inicio del body si no existe
    }

    // Actualiza el contenido del header
    header.innerHTML = `
      <h1>My Online Store</h1>
      <div class="cart-info">
        <span id="total-items-display">Total Items: ${this.state.totalItems}</span>
        <img class="open-cart-btn" src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png" alt="Cart" class="cart-icon">
      </div>
    `;

    // Añade evento al botón para alternar el carrito
    const openCartBtn = header.querySelector(".open-cart-btn");
    openCartBtn.addEventListener("click", () => {
      const cartAside = document.querySelector("aside");
      if (cartAside) {
        cartAside.classList.toggle("active");
      }
    });

    return header;
  }
}
