export class CartContext {
  constructor() {
    this.cart = []; // Almacena los productos en el carrito
    this.listeners = []; // Lista de componentes suscritos para ser notificados
  }

  // Obtiene los productos del carrito
  getCart() {
    return this.cart;
  }

  // Agrega un producto al carrito
  addProduct(product) {
    const existingProduct = this.cart.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1; // Incrementa la cantidad si ya existe
    } else {
      this.cart.push({ ...product, quantity: 1 }); // Añade un nuevo producto
    }
    this.notifyListeners();
  }

  // Actualiza la cantidad de un producto en el carrito
  updateQuantity(id, quantity) {
    this.cart = this.cart.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    this.notifyListeners();
  }

  // Elimina un producto del carrito
  removeProduct(id) {
    this.cart = this.cart.filter((item) => item.id !== id);
    this.notifyListeners();
  }

  // Obtiene el número total de productos en el carrito
  getTotalItems() {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  // Obtiene el precio total del carrito
  getTotalPrice() {
    return this.cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  // Suscribe un componente a los cambios del carrito
  subscribe(listener) {
    this.listeners.push(listener);
  }

  // Notifica a todos los componentes suscritos sobre cambios en el carrito
  notifyListeners() {
    this.listeners.forEach((listener) => listener(this.cart));
  }
}

