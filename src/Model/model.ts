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
  [key: string]: number | boolean
}

export interface Idata {
  e?: MouseEvent
}

export class Model {
  options: Ioptions
  startPositionHandle: number
  orientationSlider: keyof MouseEvent
  value: string

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
    this.startPositionHandle = 0;
    this.orientationSlider = 'pageY';
    this.value = 'value';
  }

  addStartingPositionHandle(data: Idata) {
    this.value = (<HTMLElement>data.e.target).dataset.value;

    if (this.value === 'value') {
      this.orientationSlider = 'pageX';
    }

    this.startPositionHandle = +data.e[this.orientationSlider];

    console.log(data.e[this.orientationSlider]);
  }

  changeValue(data: Idata) {
    if (this.startPositionHandle > data.e[this.orientationSlider]) {
      this.startPositionHandle = this.startPositionHandle - +data.e[this.orientationSlider];
      this.options[this.value] = +this.options[this.value] - this.startPositionHandle;
    }

    if (this.startPositionHandle < data.e[this.orientationSlider]) {
      this.startPositionHandle = +data.e[this.orientationSlider] - this.startPositionHandle;
      this.options[this.value] = +this.options[this.value] + this.startPositionHandle;
    }

    
    // координаты x или y
    // одиночный или двойной?
    // левый или правый?
  }

  get(): Ioptions {
    console.log(this.options);
    return this.options;
  }
}