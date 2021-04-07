export class Product {
    constructor
    (
        quantity,
        flavors = [],
        cart_id,
        id,
        name,
        desc,
        discount_percent,
        price,
        img,
        hasFlavors,
        max_flavors
    ) 
    {
        this.quantity = quantity;
        this.flavors = flavors;
        this.cart_id = cart_id;
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.discount_percent = discount_percent;
        this.price = price;
        this.img = img;
        this.hasFlavors = hasFlavors;
        this.max_flavors = max_flavors;
    }

}