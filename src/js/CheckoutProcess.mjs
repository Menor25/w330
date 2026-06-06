import { checkout as servicesCheckout } from './ExternalServices.mjs';
import { getLocalStorage, setLocalStorage, alertMessage } from './utils.mjs';

export default class CheckoutProcess {
    constructor() {}

    // Build order items in required format
    packageItems(items) {
        return items.map(item => ({
            id: item.Id,
            name: item.Name,
            price: item.FinalPrice,
            quantity: item.quantity || 1
        }));
    }

    async checkout(orderData) {
        try {
            const cartItems = getLocalStorage('so-cart');

            const order = {
                orderDate: new Date().toISOString(),
                fname: orderData.fname,
                lname: orderData.lname,
                street: orderData.street,
                city: orderData.city,
                state: orderData.state,
                zip: orderData.zip,
                cardNumber: orderData.cardNumber,
                expiration: orderData.expiration,
                code: orderData.code,
                items: this.packageItems(cartItems),
                orderTotal: orderData.orderTotal,
                shipping: orderData.shipping,
                tax: orderData.tax
            };

            const response = await servicesCheckout(order);

            // clear cart on success
            setLocalStorage('so-cart', []);

            // redirect to success page
            window.location.href = './success.html';

            return response;

        } catch (err) {
            if (err && err.name === 'serviceError') {
                const body = err.message;
                const message = typeof body === 'object'
                    ? JSON.stringify(body)
                    : String(body);

                alertMessage(message, true);
            } else {
                alertMessage('An unexpected error occurred. Please try again.', true);
            }

            return null;
        }
    }
}