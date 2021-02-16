import 'bootstrap';
import { Cart } from './classes/Cart';
import { printProducts } from './js/dom';
import { setEvents } from './js/events';
import { setSplide } from './js/splide';
import { setTimer } from './js/timer';
import './styles.scss';

const cart = new Cart();
const splide = setSplide();
setTimer();
setEvents(splide, cart);
printProducts(splide);