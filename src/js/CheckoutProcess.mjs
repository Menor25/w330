import ExternalServices from './ExternalServices.mjs';
import { getLocalStorage } from './utils.mjs';

function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const convertedJSON = {};
  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });
  return convertedJSON;
}

function packageItems(items) {
  return items.map((item) => ({
    id: item.Id,
    name: item.Name,
    price: item.FinalPrice,
    quantity: 1,
  }));
}

export default class CheckoutProcess {
  constructor(key) {
    this.key = key;
    this.items = getLocalStorage(key);
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
    this.services = new ExternalServices();
  }

  calculateItemSubtotal() {
    this.itemTotal = this.items.reduce((total, item) => total + item.FinalPrice, 0);
    document.querySelector('#subtotal').textContent = `$${this.itemTotal.toFixed(2)}`;
  }

  calculateOrderTotal() {
    this.tax = this.itemTotal * 0.06;
    this.shipping = this.items.length > 0 ? 10 + (this.items.length - 1) * 2 : 0;
    this.orderTotal = this.itemTotal + this.tax + this.shipping;
    document.querySelector('#tax').textContent = `$${this.tax.toFixed(2)}`;
    document.querySelector('#shipping').textContent = `$${this.shipping.toFixed(2)}`;
    document.querySelector('#order-total').textContent = `$${this.orderTotal.toFixed(2)}`;
  }

  async checkout(form) {
    this.calculateOrderTotal();
    const orderData = formDataToJSON(form);
    orderData.orderDate = new Date().toISOString();
    orderData.orderTotal = this.orderTotal.toFixed(2);
    orderData.tax = this.tax.toFixed(2);
    orderData.shipping = this.shipping;
    orderData.items = packageItems(this.items);
    console.log('Order data to be sent:', orderData);
    try {
      const response = await this.services.checkout(orderData);
      console.log('Order response:', response);
      return response;
    } catch (err) {
      console.error('Checkout error:', err);
      throw new Error(err.message);
    }
  }
}
