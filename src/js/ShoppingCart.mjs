import {
  getLocalStorage,
  setLocalStorage,
  renderListWithTemplate,
  updateCartCount,
} from "./utils.mjs";

function cartItemTemplate(item) {
  const image = item.Images?.PrimaryMedium || item.Image;

  return `<li class="cart-card divider">
    <span class="cart-card__remove" data-id="${item.Id}">X</span>

    <a href="/product_pages/index.html?product=${item.Id}" class="cart-card__image">
      <img
        src="${image}"
        alt="${item.Name}"
      />
    </a>

    <a href="/product_pages/index.html?product=${item.Id}">
      <h2 class="card__name">${item.Name}</h2>
    </a>

    <p class="cart-card__color">${item.Colors?.[0]?.ColorName || ""}</p>

    <div class="cart-card__quantity-control">
      <button class="cart-card__qty-btn" data-id="${item.Id}" data-action="decrement">−</button>
      <span class="cart-card__quantity">${item.quantity || 1}</span>
      <button class="cart-card__qty-btn" data-id="${item.Id}" data-action="increment">+</button>
    </div>

    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
  }

  init() {
    this.renderCartContents();
    this.addEventListeners();
  }

  renderCartContents() {
    const cartItems = getLocalStorage(this.key);
    const parentElement = document.querySelector(this.parentSelector);

    if (cartItems && cartItems.length > 0) {
      renderListWithTemplate(
        cartItemTemplate,
        parentElement,
        cartItems,
        "afterbegin",
        true
      );

      this.calculateListTotal(cartItems);
    } else {
      parentElement.innerHTML = "Your cart is empty";

      const cartFooter = document.querySelector(".cart-footer");
      if (cartFooter) {
        cartFooter.classList.add("hide");
      }
    }
  }

  calculateListTotal(cartItems) {
    const cartFooter = document.querySelector(".cart-footer");
    const cartTotal = document.querySelector(".cart-total");

    const total = cartItems.reduce(
      (sum, item) =>
        sum + item.FinalPrice * (item.quantity || 1),
      0
    );

    if (!cartFooter || !cartTotal) return;

    cartFooter.classList.remove("hide");
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
  }

  addEventListeners() {
    const parentElement = document.querySelector(this.parentSelector);
    if (!parentElement) return;

    if (parentElement.getAttribute("data-has-listener") === "true") {
      return;
    }

    parentElement.addEventListener("click", (event) => {
      if (event.target.classList.contains("cart-card__remove")) {
        this.removeFromCart(event.target.dataset.id);
      } else if (event.target.classList.contains("cart-card__qty-btn")) {
        const { id, action } = event.target.dataset;
        this.updateQuantity(id, action);
      }
    });

    parentElement.setAttribute("data-has-listener", "true");
  }

  updateQuantity(productId, action) {
    const cartItems = getLocalStorage(this.key);
    const item = cartItems.find((i) => i.Id === productId);
    if (!item) return;

    if (action === "increment") {
      item.quantity = (item.quantity || 1) + 1;
    } else if (action === "decrement") {
      item.quantity = (item.quantity || 1) - 1;

      if (item.quantity <= 0) {
        return this.removeFromCart(productId);
      }
    }

    setLocalStorage(this.key, cartItems);

    updateCartCount();
    this.renderCartContents();
  }

  removeFromCart(productId) {
    const cartItems = getLocalStorage(this.key);

    const itemIndex = cartItems.findIndex(
      (item) => item.Id === productId
    );

    if (itemIndex !== -1) {
      cartItems.splice(itemIndex, 1);

      setLocalStorage(this.key, cartItems);

      updateCartCount();

      this.renderCartContents();
    }
  }
}