import { IEventEmitter } from "../Presenter/presenter"

export interface Ioptions {
  min?: number
  max?: number
  value?: number
  valueFrom?: number
  valueTo?: number
  step?: number
  showValue?: boolean
  interval?: boolean
  vertical?: boolean
  height?: number
  [key: string]: number | boolean | MouseEvent | IEventEmitter | string
}

export interface Idata extends Ioptions {
  e?: MouseEvent
  emitter?: IEventEmitter
  valueString?: string
}

export class Model {
  options: Ioptions
  positionHandle: number
  orientationSlider: keyof MouseEvent
  value: string
  balance: number

  constructor({
    min = 0, 
    max = 1000,
    value = max / 2,
    valueFrom = min,
    valueTo = (max - min) / 2 + min,
    step = (max - min) / 20,
    showValue = false,
    interval = false,
    vertical = false,
    height = 500
  }: Ioptions) {
    this.options = {
      min, 
      max, 
      value, 
      valueFrom, 
      valueTo, 
      step, 
      showValue, 
      interval, 
      vertical, 
      height
    }
    this.positionHandle = 0;
    this.orientationSlider = 'pageY';
    this.value = 'value';
    this.balance = 0;
  }

  addStartingPositionHandle(data: Idata) {
    this.value = (<HTMLElement>data.e.target).dataset.value;

    if (this.value === 'value') {
      this.orientationSlider = 'pageX';
    }

    this.positionHandle = +data.e[this.orientationSlider];

    console.log(this.positionHandle);
  }

  changeValue(data: Idata) {
    if (this.value === 'value') {
      if (this.positionHandle > data.e[this.orientationSlider]) {
        console.log(data.e[this.orientationSlider]);
        console.log(this.positionHandle);
        this.balance = this.positionHandle - +data.e[this.orientationSlider];
        console.log(this.balance);
        console.log(this.options[this.value]);
        this.options[this.value] = +this.options[this.value] - this.balance;
        console.log(this.options[this.value]);
      }
  
      if (this.positionHandle < data.e[this.orientationSlider]) {
        console.log(+data.e[this.orientationSlider]);
        console.log(this.positionHandle);
        this.balance = +data.e[this.orientationSlider] - this.positionHandle;
        console.log(this.balance);
        console.log(+this.options[this.value]);
        this.options[this.value] = +this.options[this.value] + this.balance;
        console.log(this.options[this.value]);
      }
    } else {
      if (this.positionHandle > data.e[this.orientationSlider]) {
        console.log(+data.e[this.orientationSlider]);
        console.log(this.positionHandle);
        this.balance = this.positionHandle - +data.e[this.orientationSlider];
        console.log(this.balance);
        console.log(+this.options[this.value]);
        this.options[this.value] = +this.options[this.value] + this.balance;
        console.log(this.options[this.value]);
      }
  
      if (this.positionHandle < data.e[this.orientationSlider]) {
        console.log(data.e[this.orientationSlider]);
        console.log(this.positionHandle);
        this.balance = +data.e[this.orientationSlider] - this.positionHandle;
        console.log(this.balance);
        console.log(this.options[this.value]);
        this.options[this.value] = +this.options[this.value] - this.balance;
        console.log(this.options[this.value]);
      }
    }
    
    this.positionHandle = +data.e[this.orientationSlider];
    data.emitter.emit('updateView', {
      valueString: this.value, 
      value: this.options[this.value],
      valueFrom: this.options.valueFrom,
      valueTo: this.options.valueTo,
      min: this.options.min,
      max: this.options.max,
      e: data.e
    });
  }

  get(): Ioptions {
    console.log(this.options);
    return this.options;
  }
}