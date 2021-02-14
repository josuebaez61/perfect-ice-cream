import { printProducts } from './js/dom';
import { setEvents } from './js/events';
import { setSplide } from './js/splide';
import { setTimer } from './js/timer';
import './styles.scss';

const splide = setSplide();
setTimer();
setEvents();
printProducts(splide);
