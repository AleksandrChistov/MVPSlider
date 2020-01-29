export interface Idata {
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
}

export class Model {
  data: Idata

  constructor(options: Idata) {
    this.data = {
      min: options.min, 
      max: options.max, 
      value: options.value, 
      valueFrom: options.valueFrom, 
      valueTo: options.valueTo, 
      step: options.step, 
      showValue: options.showValue, 
      interval: options.interval, 
      vertical: options.vertical, 
      height: options.height
    }
  }

  get(): Idata {
    console.log(this.data);
    
    return this.data;
  }
}