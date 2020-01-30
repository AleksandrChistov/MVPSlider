import { Idata, Model } from '../Model/model'
import { View } from '../View/view'

class EventEmitter {
  events: {
    [eventName: string]: Array<(data: {})=>void>
  }

  constructor() {
    this.events = {};
  }

  subscribe(eventName: string, fn: (data: {})=>void): ()=>void{
    if ( !this.events[eventName] ) {
      this.events[eventName] = [];
    }   
    
    this.events[eventName].push(fn);

    return () => {
      this.events[eventName] = this.events[eventName].filter(eventFn => fn !== eventFn);
    }
  }
  
  emit(eventName: string, data: {}){
    this.events[eventName].forEach(fn => fn(data));
  }
}

class Presenter {
  model: Model
  view: View

  constructor(options: Idata, slider: HTMLElement) {
    this.model = new Model(options);
    this.view = new View(this.model.get(), slider);

    let emitter = new EventEmitter();
    
    // реагировать на сообщения
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