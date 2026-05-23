async function getTodos () {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/77');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        console.log(jsonData);
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

getTodos();