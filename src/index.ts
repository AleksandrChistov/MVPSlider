import { Test } from './Model/model'

const test = new Test(5);
const test2 = new Test(17);

declare global {
  interface JQuery {
    MVPSlider: () => void;
  }
}

(function($){
  $.fn.MVPSlider = () => {
    console.log(test.n);
    alert(test2.n);
  };
})(jQuery);

$('#mySlider').MVPSlider();