export class Cart {
    constructor(products = [], total_price = 0) {
        this.products = products;
        this.total_price = total_price;
    }

    addToCart( product ) {
        this.products.push( product );
        this.calcTotalPrice( product );
        console.log(this.products)
    }
    
    calcTotalPrice({ product, quantity }) {
        this.total_price += (product.price / product.discount_percent) * quantity; 
    }
}