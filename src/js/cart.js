import { loadHeaderFooter, updateCartCount } from './utils.mjs';
import ShoppingCart from './ShoppingCart.mjs';

loadHeaderFooter();

const cart = new ShoppingCart('so-cart', '.cart-list');
cart.init();
