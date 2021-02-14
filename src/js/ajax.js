import $ from 'jquery';

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