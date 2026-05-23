import { getLocalStorage, setLocalStorage } from './utils.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');
  const productList = document.querySelector('.product-list');

  if (cartItems && cartItems.length > 0) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    productList.innerHTML = htmlItems.join('');
    renderCartTotal(cartItems);
  } else {
    productList.innerHTML = 'Your cart is empty';
    document.querySelector('.cart-footer').classList.add('hide');
  }

  productList.addEventListener('click', (event) => {
    if (event.target.classList.contains('cart-card__remove')) {
      removeFromCart(event.target.dataset.id);
    }
  });
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
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
  <button class="cart-card__remove" data-id="${item.Id}">Remove</button>
</li>`;

  return newItem;
}

function removeFromCart(productId) {
  const cartItems = getLocalStorage('so-cart');
  const updatedCart = cartItems.filter((item) => item.Id !== productId);
  setLocalStorage('so-cart', updatedCart);
  renderCartContents();
}

function renderCartTotal(cartItems) {
  const cartFooter = document.querySelector('.cart-footer');
  const cartTotal = document.querySelector('.cart-total');
  const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
  cartFooter.classList.remove('hide');
  cartTotal.innerHTML = `Total: $${total.toFixed(2)}`;
}

renderCartContents();
