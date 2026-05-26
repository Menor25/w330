import { loadHeaderFooter } from './utils.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';

loadHeaderFooter();

const checkout = new CheckoutProcess('so-cart');
checkout.calculateItemSubtotal();

document.querySelector('#zip').addEventListener('blur', () => {
  if (document.querySelector('#zip').value.length === 5) {
    checkout.calculateOrderTotal();
  }
});

document.querySelector('#checkout-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  try {
    const response = await checkout.checkout(event.target);
    console.log(response);
    console.log('Order response:', response);
    alert('Order placed successfully! Thank you for your purchase.');
  } catch (err) {
    alert(`There was a problem placing your order: ${err.message}`);
  }
});
