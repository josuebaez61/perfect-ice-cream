
export const animateCSS = (element, animation, prefix = 'animate__') => {
    new Promise((resolve, reject) => {
      const animationName = `${prefix}${animation}`;
  
      $(element).addClass(`${prefix}animated`);
      $(element).addClass(animationName);
  
      function handleAnimationEnd(event) {
        event.stopPropagation();
        $(element).removeClass(`${prefix}animated`);
        $(element).removeClass(animationName);
        resolve('Animation ended');
      }
  
      $(element).one('animationend', handleAnimationEnd);
    });
}
