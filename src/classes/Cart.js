export class Cart {
    constructor(products = [], total_price = 0) {
        this.products = products;
        this.total_price = total_price;
    }

    addToCart( product ) {
        this.products.push( product );
        this.calcTotalPrice( product );
        return true;
    }
    
    calcTotalPrice({ product, quantity }) {
        this.total_price += (product.price / product.discount_percent) * quantity; 
    }

    removeProduct( cartId ) {
        const { product, quantity } = this.products.find( x => x.cart_id == cartId );
        this.total_price -= (product.price / product.discount_percent) * quantity; 
        this.products = this.products.filter( x => x.cart_id != cartId );
        return true;
    }

    resetCart() {
        this.products = [];
        this.total_price = 0;
    }
}