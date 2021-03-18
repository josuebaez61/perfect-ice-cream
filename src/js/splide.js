import Splide from '@splidejs/splide';

export const setSplide = () => {
    let splide = new Splide( '.splide', 
        {
            type: 'loop',
            perPage: 5,
            width: '1426px',
            trimSpace: false,
            gap: 10,
            fixedHeight: '520px',
            pagination: false,
            drag: false,
            breakpoints: {
                1670: {
                    perPage: 4,
                    width: '1149px'
                },
                1380: {
                    perPage: 3,
                    width: '852px'
                },
                1050: {
                    perPage: 2,
                    width: '570px'
                },
                695: {
                    perPage: 1,
                    width: '272px'
                },
                280: {
                    perPage: 1,
                    width: '271px'
                }
            }
        }
    ).mount();
    return splide;
}