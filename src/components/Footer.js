import { Component } from "../common/Component.js";

export class Footer extends Component {
  render() {
    const footer = document.createElement("footer");
    footer.className = "footer";

    footer.innerHTML = `
      <p>&copy; 2025 My Online Store. All rights reserved.</p>
    `;

    return footer;
  }
}
