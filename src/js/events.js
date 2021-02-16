import { getProductById } from "./ajax";
import { scrollTo } from 'jquery.scrollto';
import { printFlavors } from "./dom";
import { animateCSS } from "./animate";

const addCartModal = $('#addCartModal');
const quantityInput = $('#quantityInput');
const buttonAdd = $('#button-add');
const buttonSubstract = $('#button-substract');
const flavorBox = $('.flavor-box');
const cartForm = $('#cartForm');
const nav = $('nav');
const cartModal = $('#cartModal');
const mobileProductsQuantity = $('#mobileProductsQuantity') ;
const mobileTotalPrice = $('#totalPrice');
const cartButtonResponsive = $('#cartButtonResponsive');
const tdTotalPrice = $('#tdTotalPrice');

export const setEvents = (slider, cart) => {
    $('#btnDisplace').on('click', () => {
        $(window).scrollTo(
            $('#pageContent'), 500
        );
    });
    //===========================================================>>
    // SECTION Modal "Agregar al carrito"
    //===========================================================>>
    addCartModal.on('show.bs.modal', async(e) => {
        const button = e.relatedTarget;
        const prod   = await getProductById(button.dataset.id);
        const maxFlavors = parseInt(button.dataset.maxFlavors);
        let checkedQuantity = 0;
        const btnConfirm = addCartModal.find('.modal-footer .btn-primary');
        addCartModal.find('img').attr('src', prod.img );
        addCartModal.find('img').attr('alt', prod.name );
        addCartModal.find('h3').text(prod.name);
        addCartModal.find('p').text(prod.desc);
        btnConfirm.attr('data-id', prod.id);
        prod.flavors ? (await printFlavors(), flavorBox.removeClass('d-none')) : flavorBox.addClass('d-none');
        if ( prod.flavors ) {
            btnConfirm.attr('disabled', true);
            const checkboxesFlavors = $('input[type=checkbox]', cartForm);
            const flavorListsButtons = $('#flavorList button');
            flavorListsButtons.on('click', (e) => {
                const checkbox = $('input', e.delegateTarget);
                if (checkbox.is(':checked')) {
                    checkbox.attr('checked', false);
                    checkedQuantity--;
                } else {
                    checkbox.attr('checked', true);
                    checkedQuantity++;
                }
    
                if (checkedQuantity === maxFlavors) {
                    checkboxesFlavors.each( (i,input) => {
                        (!$(input).is(':checked')) && $(input).attr('disabled',true);
                        (!$(input).is(':checked')) && $(input).parents('button').attr('disabled',true);
                    });
                } else {
                    checkboxesFlavors.attr('disabled', false);
                    flavorListsButtons.attr('disabled', false);
                }

                if ( checkedQuantity < maxFlavors ) {
                    btnConfirm.attr('disabled', true);
                } else {
                    btnConfirm.attr('disabled', false);
                }
            });
        }
    });
    addCartModal.on('hidden.bs.modal', () => {
        quantityInput.val(1);
    });
    //===========================================================>>
    // !SECTION Modal "Agregar al carrito"
    //===========================================================>>
    //===========================================================>>
    // SECTION Modal "Carrito"
    //===========================================================>>
    cartModal.on('show.bs.modal', (e) => {
        console.log('CART ', cart)
        if ( cart.products.length > 0 ) {
            const tbody = cartModal.find('tbody');
            const template = document.querySelector('#trCartTemplate').content;
            const fragment = document.createDocumentFragment();
            let totalPrice = 0;
            cart.products.forEach((item, index) => {
                const tdArray = template.querySelectorAll('td');
                const discount_price = (item.product.price / item.product.discount_percent);
                tdArray[0].textContent = index + 1;
                tdArray[1].textContent = item.product.name;
                tdArray[2].textContent = item.quantity;
                tdArray[3].textContent = discount_price.toFixed(2);
                tdArray[4].textContent = (discount_price * item.quantity).toFixed(2);
                totalPrice += discount_price * item.quantity;
                const clone = template.cloneNode(true);
                fragment.appendChild(clone);
            });
            tbody.prepend(fragment);
            tdTotalPrice.text(totalPrice.toFixed(2));
            tdTotalPrice.css('font-weight', 700);
        }
    });
    //===========================================================>>
    // !SECTION Modal "Carrito"
    //===========================================================>>
    //===========================================================>>
    // SECTION Botones "SUMAR" o "RESTAR" cantidades...
    //===========================================================>>
    buttonAdd.on('click', (e) => {
        let valorInput = parseInt(quantityInput.val());
        if ( valorInput >= parseInt(quantityInput.attr('min')) && valorInput < parseInt(quantityInput.attr('max')) ) {
            quantityInput.val(valorInput += 1)
        }
    });
    buttonSubstract.on('click', (e) => {
        let valorInput = parseInt(quantityInput.val());
        if ( valorInput > parseInt(quantityInput.attr('min')) && valorInput <= parseInt(quantityInput.attr('max')) ) {
            quantityInput.val(valorInput -= 1)
        }
    });
    //===========================================================>>
    // !SECTION Botones "SUMAR" o "RESTAR" cantidades...
    //===========================================================>>
    //===========================================================>>
    // SECTION Eventos del formulario de agregar al carrito
    //===========================================================>>
    cartForm.on('submit', async (e) => {
        e.preventDefault();
        const btn  = e.originalEvent.submitter;
        const quantity = parseInt(e.target.quantity.value);
        let checkeds = [];
        let flavors  = [];
        if ( e.target.flavors ) {
            flavors = Object.values(e.target.flavors);
            checkeds = (flavors.map( flavor => $(flavor).is(':checked') ? flavor.value : null )).filter( x => x != null);
        }
        const selectedProd = await getProductById(btn.dataset.id);
        const item = {
            product: selectedProd,
            quantity,
            flavors: checkeds
        }
        cart.addToCart( item );
        addCartModal.modal('hide');
        console.log(cart.products.length)
        mobileProductsQuantity.text(cart.products.length);
        mobileTotalPrice.text('$ ' + cart.total_price.toFixed(2));
        animateCSS('#mobileProductsQuantity', 'tada');
        animateCSS('#totalPrice', 'pulse');
    });
    //===========================================================>>
    // !SECTION Eventos del formulario de agregar al carrito
    //===========================================================>>
    //===========================================================>>
    // SECTION Eventos de window
    //===========================================================>>
    window.onresize = () => {
        slider.refresh();
    }
    window.onscroll = (e) => {
        if ( window.scrollY === 0 && window.outerWidth > 768) {
            nav.css('background-color', 'transparent');
        } else {
            nav.css('background-color', '#4ad9ca');
        }

        if ( window.scrollY >= 400 ) {
            cartButtonResponsive.removeClass('d-none');
        } else {
            animateCSS('#cartButtonResponsive', 'slideInUp');
            animateCSS('#cartButtonResponsive', 'faster');
            cartButtonResponsive.addClass('d-none');
        }
    }
    //===========================================================>>
    // !SECTION Eventos de window
    //===========================================================>>
}