import { Idata, Model } from '../Model/model'

class Presenter {
  model: Model

  constructor(options: Idata) {
    this.model = new Model(options);
  }
}

declare global {
  interface JQuery {
    MVPSlider(options: Idata): Presenter;
  }
}

(function($){
  $.fn.MVPSlider = function(options: Idata) {
    let presenter = new Presenter(options);
    return presenter;
  };
})(jQuery);