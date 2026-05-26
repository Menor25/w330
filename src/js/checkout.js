import { loadHeaderFooter } from './utils.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';

loadHeaderFooter();

const myCheckout = new CheckoutProcess();

document.addEventListener('DOMContentLoaded', () => {
    const submit = document.querySelector('#checkoutSubmit');
    if (!submit) return;

    submit.addEventListener('click', (e) => {
        e.preventDefault();

        const form = document.querySelector('#checkoutForm');
        if (!form) return;

        const valid = form.checkValidity();
        if (!valid) {
            form.reportValidity();
            return;
        }

        // collect form data
        const formData = new FormData(form);
        const data = {};
        for (const [k, v] of formData.entries()) data[k] = v;

        // call checkout
        myCheckout.checkout(data);
    });
});
