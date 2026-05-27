import { loadHeaderFooter, getLocalStorage } from './utils.mjs';

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');

  if (cartItems && cartItems.length > 0) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));

    document.querySelector('.product-list').innerHTML = htmlItems.join('');

    renderCartTotal(cartItems);
    document.querySelector('.cart-footer').classList.remove('hide');
  } else {
    document.querySelector('.product-list').innerHTML = 'Your cart is empty';
    document.querySelector('.cart-footer').classList.add('hide');
  }
}

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

function renderCartTotal(cartItems) {
  const total = cartItems.reduce((sum, item) => {
    return sum + item.FinalPrice;
  }, 0);

  document.querySelector('.cart-total').innerHTML = `
    <h3>Total: $${total.toFixed(2)}</h3>
  `;
}

renderCartContents();