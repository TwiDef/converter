'use strict';

const url = 'https://www.cbr-xml-daily.ru/daily_json.js';

const elementUSD = document.querySelector('[data-value="USD"]');
const elementEUR = document.querySelector('[data-value="EUR"]');
const elementGBP = document.querySelector('[data-value="GBP"]');

const input = document.querySelector('#input');
const result = document.querySelector('#result');
const select = document.querySelector('#select');

const rates = {};

getCurrencies();


async function getCurrencies() {
    const response = await fetch(url);
    const data = await response.json();
    const result = await data;
    console.log(result);

    rates.USD = result.Valute.USD;
    rates.EUR = result.Valute.EUR;
    rates.GBP = result.Valute.GBP;

    elementUSD.textContent = rates.USD.Value.toFixed(2);
    elementEUR.textContent = rates.EUR.Value.toFixed(2);
    elementGBP.textContent = rates.GBP.Value.toFixed(2);


    /* color for informer USD*/
    if (rates.USD.Value > rates.USD.Previos) {
        elementUSD.classList.add('top');
    } else {
        elementUSD.classList.add('bottom');
    }

    /* color for informer EUR*/
    if (rates.EUR.Value > rates.EUR.Previos) {
        elementEUR.classList.add('top');
    } else {
        elementEUR.classList.add('bottom');
    }

    /* color for informer GBP*/
    if (rates.GBP.Value > rates.GBP.Previos) {
        elementGBP.classList.add('top');
    } else {
        elementGBP.classList.add('bottom');
    }
}

function converValue() {
    result.value = (parseFloat(input.value) / rates[select.value].Value).toFixed(2);
}

/* Listen changes on fields */
input.addEventListener('input', () => converValue());
select.addEventListener('input', () => converValue());
