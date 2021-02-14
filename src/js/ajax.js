
export const getProducts = () => {
    return new Promise((resolve,reject) => {
        $.ajax({
            type: 'GET',
            url: '../database/promo.json',
            success: resolve,
            error: reject
        });
    });
}

export const getProductById = (id) => {
    return new Promise((resolve,reject) => {
        $.ajax({
            type: 'GET',
            url: '../database/promo.json',
            success: (res) => {
                resolve( res.find(p => p.id == id) );
            },
            error: reject
        });
    });
}