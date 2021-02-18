import { animateCSS } from "../js/animate";

const navbarCounter = $('#navbarCounter');
const smallScreenCounter = $('#smallScreenCounter');
const smallTotalPrice = $('#smallTotalPrice');
const tdTotalPrice = $('#tdTotalPrice');
const navbarBtnCart = $('#navbarBtnCart');
const btnConfirmOrder = $('#btnConfirmOrder');

export class Cart {
    constructor(products = [], total_price = 0) {
        this.products = products;
        this.total_price = total_price;
    }

    addToCart( product ) {
        this.products.push( product );
        this.calcTotalPrice( product );
        this.printCounter();
        animateCSS(smallScreenCounter, 'pulse');
        animateCSS(navbarBtnCart, 'tada');
        animateCSS(smallTotalPrice, 'pulse');
        return true;
    }
    
    calcTotalPrice({ price, discount_percent, quantity }) {
        this.total_price += (price / discount_percent) * quantity; 
    }

    removeProduct( cartId ) {
        const { discount_percent, price, quantity } = this.products.find( x => x.cart_id == cartId );
        this.total_price -= (price / discount_percent) * quantity; 
        this.products = this.products.filter( x => x.cart_id != cartId );
        if ( !this.products.length > 0 ) btnConfirmOrder.attr('disabled', true);
        this.printCounter();
        return true;
    }

    resetCart() {
        this.products = [];
        this.total_price = 0;
        this.printCounter();
    }

    printCounter() {
        navbarCounter.text(this.products.length);
        smallScreenCounter.text(this.products.length);
        smallTotalPrice.text('$ ' + Math.abs(this.total_price).toFixed(2));
        tdTotalPrice.text('$ ' + Math.abs(this.total_price).toFixed(2));
    }
}