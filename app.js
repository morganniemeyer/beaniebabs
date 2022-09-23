/* Imports */
import { renderBeanie, renderAstroSignOption } from './render-utils.js';
import { getBeanies, getAstroSigns } from './fetch-utils.js';

/* Get DOM Elements */
const notificationDisplay = document.getElementById('notice-display');
const sForm = document.getElementById('search');
const beanieList = document.getElementById('beanie-list');
const astroSignSelect = document.getElementById('astro-select');
/* State */
let error = null;
let count = 0;
let astroSigns = [];
let beanies = [];
/* Events */
window.addEventListener('load', async () => {
    findBeanies();
    const response = await getAstroSigns();

    error = response.error;
    astroSigns = response.data;

    if (!error) {
        displayAstroSignOptions();
    }
});

async function findBeanies(name, astroSign) {
    const response = await getBeanies(name, astroSign);

    error = response.error;
    count = response.count;
    beanies = response.data;

    displayNotifications();
    if (!error) {
        displayBeanies();
    }
}

sForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(sForm);
    findBeanies(formData.get('name'), formData.get('astroSign'));
});

/* Display Functions */

function displayBeanies() {
    beanieList.innerHTML = '';

    for (const beanie of beanies) {
        const beanieEl = renderBeanie(beanie);
        beanieList.append(beanieEl);
    }
}
function displayAstroSignOptions() {
    for (const astroSign of astroSigns) {
        const option = renderAstroSignOption(astroSign);
        astroSignSelect.append(option);
    }
}

function displayNotifications() {
    if (error) {
        notificationDisplay.classList.add('error');
        notificationDisplay.textContent = error.message;
    } else {
        notificationDisplay.classList.remove('error');
        notificationDisplay.textContent = `Showing ${beanies.length} of ${count} registered beanies.`;
    }
}
// (don't forget to call any display functions you want to run on page load!)
