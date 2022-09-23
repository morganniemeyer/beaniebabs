/* Imports */
import { renderBeanie } from './render-utils.js';
import { getBeanies } from './fetch-utils.js';

/* Get DOM Elements */
const sForm = document.getElementById('search');
const beanieList = document.getElementById('beanie-list');

/* State */
let error = null;
let beanies = [];
/* Events */
async function findBeanies(name) {
    const response = await getBeanies(name);

    error = response.error;
    beanies = response.data;
    console.log(response.data);
}

sForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(sForm);
    findBeanies(formData.get('name'));
});

/* Display Functions */

function displayBeanies() {
    beanieList.innerHTML = '';

    for (const beanie of beanies) {
        const beanieEl = renderBeanie(beanie);
        beanieList.append(beanieEl);
    }
}

// (don't forget to call any display functions you want to run on page load!)
