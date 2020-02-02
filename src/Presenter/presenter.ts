import { Ioptions, Idata, Model } from '../Model/model'
import { View } from '../View/view'

export interface IEventEmitter {
  events: {}
  subscribe: (eventName: string, fn: ()=>void)=>void
  emit: (eventName: string, data: {})=>void
}

class EventEmitter implements IEventEmitter {
  events: {
    [eventName: string]: Array<(data: {})=>void>
  }

  constructor() {
    this.events = {};
  }

  subscribe(eventName: string, fn: (data: Idata)=>void): ()=>void {
    if ( !this.events[eventName] ) {
      this.events[eventName] = [];
    }   
    
    this.events[eventName].push(fn);

    return () => {
      this.events[eventName] = this.events[eventName].filter(eventFn => fn !== eventFn);
    }
  }
  
  emit(eventName: string, data: Idata): void {
    this.events[eventName].forEach(fn => fn(data));
  }
}

class Presenter {
  model: Model
  view: View

  constructor(options: Ioptions, slider: HTMLElement) {
    this.model = new Model(options);
    this.view = new View(this.model.get(), slider);
  }
}

declare global {
  interface JQuery {
    MVPSlider(options: Ioptions): void;
  }
}

(function($){
  $.fn.MVPSlider = function(options: Ioptions) {
    let presenter = new Presenter(options, this[0]);

    let emitter = new EventEmitter();

    this.append(presenter.view.getHtml());

    emitter.subscribe('addStartingPositionHandle', (data) => {
      presenter.model.addStartingPositionHandle(data);
    });

    emitter.subscribe('changeValue', (data) => {
      presenter.model.changeValue(data);
    });

    emitter.subscribe('updateView', (data) => {
      presenter.view.updateView(data);
    });

    presenter.view.addChangePositionHandler(emitter);
  };
})(jQuery);