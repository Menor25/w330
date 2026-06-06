// External services wrapper
// convertToJson: parse response body first, then check res.ok
export async function convertToJson(res) {
    const jsonResponse = await res.json();

    if (res.ok) {
        return jsonResponse;
    }

    // throw structured error so CheckoutProcess can handle it
    throw {
        name: 'serviceError',
        message: jsonResponse
    };
}


// Checkout implementation - posts order to course backend
export async function checkout(order) {
    const response = await fetch(
        'https://wdd330-backend.onrender.com:3000/checkout',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        }
    );

    return convertToJson(response);
}