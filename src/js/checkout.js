import { loadHeaderFooter } from './utils.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';

loadHeaderFooter();

const myCheckout = new CheckoutProcess();

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#checkoutForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // HTML validation
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // collect form data
        const formData = new FormData(form);
        const data = {};
        for (const [k, v] of formData.entries()) {
            data[k] = v;
        }

        try {
            await myCheckout.checkout(data);
        } catch (err) {
            console.error('Checkout failed:', err);
        }
    });
});