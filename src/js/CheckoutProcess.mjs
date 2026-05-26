import { checkout as servicesCheckout } from './ExternalServices.mjs';
import { getLocalStorage, setLocalStorage, alertMessage } from './utils.mjs';

export default class CheckoutProcess {
    constructor() { }

    // orderData should be an object with customer fields
    async checkout(orderData) {
        try {
            const cartItems = getLocalStorage('so-cart');
            const order = {
                customer: orderData,
                items: cartItems,
                submittedAt: new Date().toISOString(),
            };

            const response = await servicesCheckout(order);

            // on success: clear cart and navigate to success page
            setLocalStorage('so-cart', []);
            window.location.href = '/checkout/success.html';
            return response;
        } catch (err) {
            // Show a friendly alert with server-provided details when available
            if (err && err.name === 'servicesError') {
                const body = err.message;
                // If body is object with errors, show it; else stringify
                const message = typeof body === 'object' ? body : String(body);
                alertMessage(message, true);
            } else {
                alertMessage('An unexpected error occurred. Please try again.', true);
            }
            // do not rethrow; we handled the error for the UI
            return null;
        }
    }
}
