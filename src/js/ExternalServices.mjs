// External services wrapper
// convertToJson: parse response body first, then check res.ok
export async function convertToJson(res) {
    const jsonResponse = await res.json();
    if (res.ok) {
        return jsonResponse;
    }
    // throw an object so callers can inspect name/message
    throw { name: 'servicesError', message: jsonResponse };
}

// Checkout implementation - posts order to a simple echo endpoint
export async function checkout(order) {
    const response = await fetch('https://httpbin.org/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    });

    return convertToJson(response);
}
