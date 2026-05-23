export default class Alert {
    constructor(){
        this.url = '../../public/json/alert.json';
    }

    async getAlerts() {
        try {
            const response = await fetch(this.url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const jsonData = await response.json();

            const alertSection = document.createElement('section');
            alertSection.classList.add('alert-list');

            jsonData.forEach(alert => {
                const alertParagraph = document.createElement('p');
                alertParagraph.textContent = alert.message;
                alertParagraph.style.backgroundColor = alert.background;
                alertParagraph.style.color = alert.color;
                alertSection.appendChild(alertParagraph);
            })

            const mainElement = document.querySelector('main');
            mainElement.prepend(alertSection);
        } catch (error) {
             console.error('Error fetching data:', error);
        }
    }
}