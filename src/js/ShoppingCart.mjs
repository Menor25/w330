import { getLocalStorage, setLocalStorage, renderListWithTemplate } from './utils.mjs';

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <span class="cart-card__remove" data-id="${item.Id}">X</span>
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
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
      renderListWithTemplate(cartItemTemplate, parentElement, cartItems, 'afterbegin', true);
      this.calculateListTotal(cartItems);
    } else {
      parentElement.innerHTML = 'Your cart is empty';
      const cartFooter = document.querySelector('.cart-footer');
      if (cartFooter) {
        cartFooter.classList.add('hide');
      }
    }
  }

  calculateListTotal(cartItems) {
    const cartFooter = document.querySelector('.cart-footer');
    const cartTotal = document.querySelector('.cart-total');
    const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
    cartFooter.classList.remove('hide');
    cartTotal.innerHTML = `Total: $${total.toFixed(2)}`;
  }

  addEventListeners() {
    document.querySelector(this.parentSelector).addEventListener('click', (event) => {
      if (event.target.classList.contains('cart-card__remove')) {
        this.removeFromCart(event.target.dataset.id);
      }
    });
  }

  removeFromCart(productId) {
    const cartItems = getLocalStorage(this.key);
    const itemIndex = cartItems.findIndex((item) => item.Id === productId);
    
    if (itemIndex !== -1) {
      cartItems.splice(itemIndex, 1);
      setLocalStorage(this.key, cartItems);
      this.renderCartContents();
    }
  }
}
