export default class Alert {
    constructor(){
        this.url = '../json/alert.json';
    }

    async getAlerts() {
        try {
            const response = await fetch(this.url);
            console.log(this.url);
            console.log(response);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new TypeError('Expected JSON response but received something else.');
            }

            const alerts = await response.json();

            const alertSection = document.createElement('section');
            alertSection.classList.add('alert-list');

            alerts.forEach(alert => {
                const alertParagraph = document.createElement('p');
                alertParagraph.textContent = alert.message;
                alertParagraph.style.backgroundColor = alert.background;
                alertParagraph.style.color = alert.color;
                alertSection.appendChild(alertParagraph);
            })

            const mainElement = document.querySelector('main');
            if (mainElement) {
                mainElement.prepend(alertSection);
            }
        } catch (error) {
             console.error('Error fetching data:', error);
        }
    }
}