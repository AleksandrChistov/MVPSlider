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
  
  let min = 0;
  let max = 1000;

  let defaults = {
    min: min, 
    max: max,
    value: max / 2,
    valueFrom: min,
    valueTo: (max - min) / 2 + min,
    step: (max - min) / 20,
    showValue: false,
    interval: false,
    vertical: false,
    height: 500
  }

  $.fn.MVPSlider = function(options: Idata) {
    let config = $.extend({}, defaults, options);
    let presenter = new Presenter(config, this[0]);
    this.append(presenter.view.getHtml());
  };
})(jQuery);