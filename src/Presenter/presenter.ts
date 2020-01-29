import { Idata, Model } from '../Model/model'
import { View } from '../View/view'

class Presenter {
  model: Model
  view: View

  constructor(options: Idata, slider: HTMLElement) {
    this.model = new Model(options);
    this.view = new View(this.model.get(), slider);


  }
}

declare global {
  interface JQuery {
    MVPSlider(options: Idata): void;
  }
}

(function($){
  $.fn.MVPSlider = function(options: Idata) {
    let presenter = new Presenter(options, this[0]);
    this.append(presenter.view.getHtml());
  };
})(jQuery);