import { getFlavors, getProducts } from "./ajax";

export const printProducts = async (splide) => {
    const sliderLi = document.getElementById('splide__list');
    const template = document.getElementById('liTemplate').content;
    const fragment = document.createDocumentFragment();
    const products = await getProducts();
    for (const product of products) {
        template.querySelector('img').src = product.img;
        template.querySelector('img').alt = product.name;
        template.querySelector('.card-title').textContent = product.name;
        template.querySelector('.card-text').textContent = product.desc;
        template.querySelector('.card-discount').textContent = '$ ' + (product.price / product.discount_percent ).toFixed(2);
        template.querySelector('.card-price').textContent = '$ ' + product.price.toFixed(2);
        template.querySelector('button').dataset.id = product.id;
        template.querySelector('button').dataset.maxFlavors = product.max_flavors;
        const clone = template.cloneNode(true);
        fragment.appendChild(clone);
    }
    sliderLi.appendChild(fragment);
    splide.refresh().mount();
}

export const printFlavors = async () => {
    const flavorList = document.getElementById('flavorList');
    flavorList.innerHTML = "";
    const template = document.getElementById('flavorTemplate').content;
    const fragment = document.createDocumentFragment();
    const flavors = await getFlavors();
    for (const flavor of flavors) {
        const button = template.querySelector('button');
        const label = template.querySelector('label');
        const checkbox = template.querySelector('input');
        label.textContent = flavor.name;
        label.classList.add('pointer');
        checkbox.value = flavor.id;
        const clone = template.cloneNode(true);
        fragment.appendChild(clone);
    }
    flavorList.appendChild(fragment);
    return true;
}