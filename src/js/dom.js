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

export const printCartList = ( cart, tbody ) => {
    const tdTotalPrice = $('#tdTotalPrice');
    let totalPrice = 0;
    const template = document.querySelector('#trCartTemplate').content;
    const fragment = document.createDocumentFragment();
    cart.products.forEach((product, index) => {
        const tdArray = template.querySelectorAll('td');
        const inputQuantity = template.querySelector('input');
        const discount_price = (product.price / product.discount_percent);
<<<<<<< HEAD
        tdArray[0].textContent = product.name;
        tdArray[1].textContent = product.quantity;
        tdArray[2].textContent = discount_price.toFixed(2);
        tdArray[2].classList.add('text-center');
        tdArray[3].textContent = (discount_price * product.quantity).toFixed(2);
        tdArray[3].classList.add('text-center');
=======
        tdArray[0].textContent = index + 1;
        tdArray[1].textContent = product.name;

        // tdArray[2].textContent = product.quantity;
        inputQuantity.value = product.quantity;

        tdArray[3].textContent = discount_price.toFixed(2);
        tdArray[4].textContent = (discount_price * product.quantity).toFixed(2);
>>>>>>> 5d8ab616e8d491151fe51a2a53ee1ba96a53d524
        template.querySelector('.btn-secondary').dataset.cartId = product.cart_id;
        totalPrice += discount_price * product.quantity;
        const clone = template.cloneNode(true);
        fragment.appendChild(clone);
    });
    tbody.prepend(fragment);
    tdTotalPrice.text('$' + totalPrice.toFixed(2));
    return totalPrice;
}