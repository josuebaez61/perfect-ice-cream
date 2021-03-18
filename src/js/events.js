import { getProductById } from "./ajax";
import { scrollTo } from 'jquery.scrollto';
import { printCartList, printFlavors } from "./dom";
import { animateCSS } from "./animate";
import Swal from "sweetalert2";
import { Product } from "../classes/Product";
import { IsEmail } from "./helpers/isEmail";

const addCartModal = $('#addCartModal');
const quantityInput = $('#quantityInput');
const buttonAdd = $('#button-add');
const buttonSubstract = $('#button-substract');
const flavorBox = $('.flavor-box');
const cartForm = $('#cartForm');
const nav = $('nav');
const cartModal = $('#cartModal');
const cartButtonResponsive = $('#cartButtonResponsive');
const btnConfirmOrder = $('#btnConfirmOrder');
const textCartEmpty = $('#textCartEmpty');
const contactForm = $('#contactForm');
const messageLengthCounter = $('#messageLengthCounter');
const textareaContactForm = $('textarea', contactForm);
const emailContactForm = $('input[type=email]', contactForm);

export const setEvents = (slider, cart) => {
    $('#btnDisplace').on('click', () => {
        $(window).scrollTo(
            $('#pageContent'), 500
        );
    });
    //===========================================================>>
    // SECTION Modal "Agregar al carrito"
    //===========================================================>>
    addCartModal.on('show.bs.modal', async (e) => {
        const button = e.relatedTarget;
        const prod = await getProductById(button.dataset.id);
        const maxFlavors = parseInt(button.dataset.maxFlavors);
        let checkedQuantity = 0;
        const btnConfirm = addCartModal.find('.modal-footer .btn-primary');
        addCartModal.find('img').attr('src', prod.img);
        addCartModal.find('img').attr('alt', prod.name);
        addCartModal.find('h3').text(prod.name);
        addCartModal.find('p').text(prod.desc);
        btnConfirm.attr('data-id', prod.id);
        prod.flavors ? (await printFlavors(), flavorBox.removeClass('d-none')) : flavorBox.addClass('d-none');
        if (prod.flavors) {
            btnConfirm.attr('disabled', true);
            const flavorsCheckboxes = $('input[type=checkbox]', cartForm);
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
                    flavorsCheckboxes.each((i, input) => {
                        (!$(input).is(':checked')) && $(input).attr('disabled', true);
                        (!$(input).is(':checked')) && $(input).parents('button').attr('disabled', true);
                    });
                } else {
                    flavorsCheckboxes.attr('disabled', false);
                    flavorListsButtons.attr('disabled', false);
                }

                if (checkedQuantity < maxFlavors) {
                    btnConfirm.attr('disabled', true);
                } else {
                    btnConfirm.attr('disabled', false);
                }
            });
        } else {
            btnConfirm.attr('disabled', false);
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
        if (cart.products.length > 0) {
            btnConfirmOrder.attr('disabled', false);
            $('#listItems').removeClass('d-none');
            textCartEmpty.addClass('d-none');
            const tbody = cartModal.find('tbody');
            tbody.html('');
            printCartList(cart, tbody);
            const btnRemove = cartModal.find('#listItems .btn-secondary');
            btnRemove.each((i, btn) => { // Se establece un eventListener a cada boton generado en la tabla para remover un producto del carrito...
                $(btn).on('click', e => {
                    const cartId = $(btn).data('cart-id');
                    if (cart.removeProduct(cartId)) {
                        $(btn).parents('tr').remove();
                        if (!cart.products.length > 0) {
                            textCartEmpty.removeClass('d-none');
                            $('#listItems').addClass('d-none');
                        }
                    }
                })
            });
            const quantityButtons = cartModal.find('#listItems .quantity-button');
            quantityButtons.each((i, btn) => {
                $(btn).on('click', () => {
                    let input;
                    switch ($(btn).data('action')) {
                        case 'substract':
                            input = $(btn).parent('.input-group-prepend').next('input');
                            input.val() > 1 &&
                                input.val(parseInt(input.val()) - 1);
                            break;
                        case 'add':
                            input = $(btn).parent('.input-group-append').prev('input');
                            input.val() < parseInt(input.attr('max')) &&
                            input.val(parseInt(input.val()) + 1);
                            break;
                        default: break;
                    }
                });
            });
            // const inputsQuantity = cartModal.find('#listItems input');
            // console.log(inputsQuantity)
            // inputsQuantity.each((i, input) => {
            //     $(input).on('change', () => {
            //         console.log('HOLA')
            //     });
            // });
        } else {
            $('#listItems').addClass('d-none');
            textCartEmpty.removeClass('d-none');
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
        if (valorInput >= parseInt(quantityInput.attr('min')) && valorInput < parseInt(quantityInput.attr('max'))) {
            quantityInput.val(valorInput += 1)
        }
    });
    buttonSubstract.on('click', (e) => {
        let valorInput = parseInt(quantityInput.val());
        if (valorInput > parseInt(quantityInput.attr('min')) && valorInput <= parseInt(quantityInput.attr('max'))) {
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
        const btn = e.originalEvent.submitter;
        const quantity = parseInt(e.target.quantity.value);
        let checkeds = [];
        let flavorsArray = [];
        if (e.target.flavors) {
            flavorsArray = Object.values(e.target.flavors);
            checkeds = (flavorsArray.map(flavor => $(flavor).is(':checked') ? flavorsArray.value : null)).filter(x => x != null);
        }
        const { id, name, desc, discount_percent, price, img, flavors, max_flavors } = await getProductById(btn.dataset.id);
        const product = new Product(quantity, checkeds, new Date().getTime(), id, name, desc, discount_percent, price, img, flavors, max_flavors);
        if (cart.addToCart(product)) {
            addCartModal.modal('hide');
            $('#successToast').toast('show');
        };
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
    window.onscroll = () => {
        if (window.scrollY === 0 && window.outerWidth > 768) {
            nav.css('background-color', 'transparent');
        } else {
            nav.css('background-color', '#4ad9ca');
        }

        if (window.scrollY >= 400) {
            cartButtonResponsive.removeClass('d-none');
        } else {
            animateCSS(cartButtonResponsive, 'slideInUp');
            animateCSS(cartButtonResponsive, 'faster');
            cartButtonResponsive.addClass('d-none');
        }
    }
    //===========================================================>>
    // !SECTION Eventos de window
    //===========================================================>>
    //===========================================================>>
    // SECTION Confirmacion de la orden
    //===========================================================>>
    btnConfirmOrder.on('click', () => {
        cartModal.modal('hide');
        cart.resetCart();
        cartModal.find('tbody').html('');
        Swal.fire({
            title: 'Pedido confirmado',
            icon: 'success',
            confirmButtonColor: '#f25e86'
        });
    });
    //===========================================================>>
    // !SECTION Confirmacion de la orden
    //===========================================================>>
    textareaContactForm.on('keydown', () => {
        messageLengthCounter.text(`${textareaContactForm.val().length}/${textareaContactForm.attr('maxlength')}`)
    });
    textareaContactForm.on('keyup', () => {
        if (textareaContactForm.val().length > 0) {
            textareaContactForm.removeClass('is-invalid');
            textareaContactForm.addClass('is-valid');
        } else {
            textareaContactForm.removeClass('is-valid');
            textareaContactForm.addClass('is-invalid');
        }
        messageLengthCounter.text(`${textareaContactForm.val().length}/${textareaContactForm.attr('maxlength')}`)
    });

    emailContactForm.on('keyup', () => {
        if (emailContactForm.val().length > 0 && IsEmail(emailContactForm.val())) {
            emailContactForm.removeClass('is-invalid');
            emailContactForm.addClass('is-valid');
        } else {
            emailContactForm.removeClass('is-valid');
            emailContactForm.addClass('is-invalid');
        }
    });

    contactForm.on('submit', (e) => {
        e.preventDefault();
        const emailInput = e.target.email;
        const messageText = e.target.message;
        if ((emailInput.value.length <= 0 || !IsEmail(emailInput.value)) || messageText.value.length <= 0) {
            (emailInput.value.length <= 0 || !IsEmail(emailInput.value)) && $(emailInput).addClass('is-invalid');
            messageText.value.length <= 0 && $(messageText).addClass('is-invalid');
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                html: 'Asegurese de completar <strong>correctamente</strong> todos los campos del formulario',
                confirmButtonColor: '#f25e86'
            })
        } else {
            $(emailInput).removeClass('is-invalid');
            $(messageText).removeClass('is-invalid');
            Swal.fire({
                icon: 'success',
                title: 'Mensaje enviado',
                confirmButtonColor: '#f25e86'
            }).then(() => {
                $('input[type=email]', contactForm).val('');
                textareaContactForm.val('');
                messageLengthCounter.text(`${textareaContactForm.val().length}/${textareaContactForm.attr('maxlength')}`)
                $(emailInput).removeClass('is-valid');
                $(messageText).removeClass('is-valid');
                $(emailInput).removeClass('is-invalid');
                $(messageText).removeClass('is-invalid');
            });
        }
    });
}