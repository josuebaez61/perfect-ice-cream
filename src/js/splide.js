import Splide from '@splidejs/splide';

export const setSplide = () => {
    let splide = new Splide( '.splide', 
        {
            type: 'loop',
            perPage: 5,
            width: '1480px',
            trimSpace: false,
            gap: 10,
            fixedHeight: '520px',
            pagination: false,
            breakpoints: {
                1670: {
                    perPage: 4,
                    width: '1190px'
                },
                1380: {
                    perPage: 3,
                    width: '890px'
                },
                1050: {
                    perPage: 2,
                    width: '586px'
                },
                695: {
                    perPage: 1,
                    width: '286px'
                }
            }
        }
    ).mount();
    return splide;
}